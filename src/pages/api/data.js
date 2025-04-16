// src/pages/api/data.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    // Destructure query params, defaulting as needed
    const {
      page = '1',
      limit = '100',
      sortBy = 'First Name',     // assume columns match your DB
      sortDir = 'asc',
      province = '',
      city = '',
      firm = '',
      team = '',
    } = req.query;
  
    // Convert numeric strings
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 100;
    // The offset for pagination
    const offset = (pageNum - 1) * limitNum;
  
    // Basic sanitization for column name. Or map known keys (like a switch).
    let orderColumn = sortBy.replace(/[^a-zA-Z0-9_ ]/g, '');
    let direction = (sortDir === 'desc') ? 'DESC' : 'ASC';
  
    // Build the WHERE clause to handle filters if not empty.
    // We'll use an array of conditions, then join with AND.
    // For instance: (province='' OR Province=?)
    // means if province is empty we ignore that filter,
    // else we require a match.
  
    // We'll build placeholders for each filter that isn't empty.
    // e.g. "((?='') OR Province=?)" approach
    const whereClauses = [];
    const values = [];
  
    // Province filter
    // "((? = '') OR Province = ?)" => first param is the province value, 
    // if it's '' we skip; second param is the actual value if not ''.
    whereClauses.push(`((? = '') OR Province = ?)`);
    values.push(province, province);
  
    // City filter
    whereClauses.push(`((? = '') OR City = ?)`);
    values.push(city, city);
  
    // Firm filter
    whereClauses.push(`((? = '') OR Firm = ?)`);
    values.push(firm, firm);
  
    // Team filter
    whereClauses.push(`((? = '') OR \`Team Name\` = ?)`);
    values.push(team, team);
  
    // Join them with AND
    const whereString = whereClauses.join(' AND ');
  
    // For LIMIT/OFFSET, we can't use placeholders for older MySQL versions in prepared statements
    // So we might do string interpolation. We'll do a numeric check for safety.
    const safeLimit = Number.isNaN(limitNum) ? 100 : limitNum;
    const safeOffset = Number.isNaN(offset) ? 0 : offset;
  
    // Build final query string
    // ORDER BY backticks around the column name
    // direction is either ASC or DESC
    const queryString = `
      SELECT *
      FROM \`data\`
      WHERE ${whereString}
      ORDER BY \`${orderColumn}\` ${direction}
      LIMIT ${safeLimit}
      OFFSET ${safeOffset}
    `;
  
    // We'll also need a separate COUNT query to get the total matched rows
    const countQuery = `
      SELECT COUNT(*) AS count
      FROM \`data\`
      WHERE ${whereString}
    `;

  const connectionConfig = {
    host: 'advisorwebapp.crcke66wq2ed.ca-central-1.rds.amazonaws.com',   // e.g., 'localhost' or 'mydbinstance.abc123xyz.us-east-1.rds.amazonaws.com'
    port: 3306,                        // Default MySQL port is 3306
    user: 'Admin',    // Replace with your actual MySQL username
    password: '28UKOJi3OshzZT', // Replace with your actual MySQL password
    database: 'advisor_dashboard' // Replace with your actual database name
  };

  try {
    const conn = await mysql.createConnection(connectionConfig);

    // First, run the COUNT query
    const [countResult] = await conn.execute(countQuery, values);
    const total = countResult[0].count || 0;

    // Next, run the main SELECT for the actual rows
    // We'll reuse the same values array for the WHERE placeholders
    // but for the LIMIT/OFFSET, we already baked them into the query string
    const [rows] = await conn.execute(queryString, values);

    await conn.end();

    // Return the data
    res.status(200).json({
      data: rows,
      total,
      page: pageNum,
      limit: limitNum,
    });
  } catch (err) {
    console.error("API /data error:", err);
    res.status(500).json({ error: err.message });
  }
}