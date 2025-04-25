import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Fill in your database configuration here
  const connectionConfig = {
    host: 'advisorwebapp.crcke66wq2ed.ca-central-1.rds.amazonaws.com',         // e.g., 'your-database-host'
    port: 3306,       // Default MySQL port is 3306
    user: 'Admin',         // Your MySQL username
    password: '28UKOJi3OshzZT',     // Your MySQL password
    database: 'advisor_dashboard'      // Your database name
  };

  // Extract query parameters (for cascading filters)
  const { province = '', city = '', firm = '', team = '' } = req.query;

  try {
    const conn = await mysql.createConnection(connectionConfig);

    // -------------------------------
    // Province Options (exclude filtering on Province itself)
    // -------------------------------
    let provConditions = "WHERE TRIM(Province) <> ''";
    const provParams = [];
    if (city) {
      provConditions += " AND TRIM(City)=?";
      provParams.push(city);
    }
    if (firm) {
      provConditions += " AND TRIM(Firm)=?";
      provParams.push(firm);
    }
    if (team) {
      provConditions += " AND TRIM(`Team Name`)=?";
      provParams.push(team);
    }

    const [provRows] = await conn.query(
      `
      SELECT DISTINCT TRIM(Province) AS val
      FROM \`data\`
      ${provConditions}
      ORDER BY val
      `,
      provParams
    );

    // -------------------------------
    // City Options (filter by Province, Firm, Team if provided)
    // -------------------------------
    let cityConditions = "WHERE TRIM(City) <> ''";
    const cityParams = [];
    if (province) {
      cityConditions += " AND TRIM(Province)=?";
      cityParams.push(province);
    }
    if (firm) {
      cityConditions += " AND TRIM(Firm)=?";
      cityParams.push(firm);
    }
    if (team) {
      cityConditions += " AND TRIM(`Team Name`)=?";
      cityParams.push(team);
    }

    const [cityRows] = await conn.query(
      `
      SELECT DISTINCT TRIM(City) AS val
      FROM \`data\`
      ${cityConditions}
      ORDER BY val
      `,
      cityParams
    );

    // -------------------------------
    // Firm Options (filter by Province, City, Team)
    // -------------------------------
    let firmConditions = "WHERE TRIM(Firm) <> ''";
    const firmParams = [];
    if (province) {
      firmConditions += " AND TRIM(Province)=?";
      firmParams.push(province);
    }
    if (city) {
      firmConditions += " AND TRIM(City)=?";
      firmParams.push(city);
    }
    if (team) {
      firmConditions += " AND TRIM(`Team Name`)=?";
      firmParams.push(team);
    }

    const [firmRows] = await conn.query(
      `
      SELECT DISTINCT TRIM(Firm) AS val
      FROM \`data\`
      ${firmConditions}
      ORDER BY val
      `,
      firmParams
    );

    // -------------------------------
    // Team Options (filter by Province, City, Firm)
    // -------------------------------
    let teamConditions = "WHERE TRIM(`Team Name`) <> ''";
    const teamParams = [];
    if (province) {
      teamConditions += " AND TRIM(Province)=?";
      teamParams.push(province);
    }
    if (city) {
      teamConditions += " AND TRIM(City)=?";
      teamParams.push(city);
    }
    if (firm) {
      teamConditions += " AND TRIM(Firm)=?";
      teamParams.push(firm);
    }
    
    const [teamRows] = await conn.query(
      `
      SELECT DISTINCT TRIM(\`Team Name\`) AS val
      FROM \`data\`
      ${teamConditions}
      ORDER BY val
      `,
      teamParams
    );

    await conn.end();

    // Using Set to ensure uniqueness
    const provinces = [...new Set(provRows.map(r => r.val).filter(Boolean))];
    const cities    = [...new Set(cityRows.map(r => r.val).filter(Boolean))];
    const firms     = [...new Set(firmRows.map(r => r.val).filter(Boolean))];
    const teams     = [...new Set(teamRows.map(r => r.val).filter(Boolean))];

    res.status(200).json({ provinces, cities, firms, teams });
  } catch (err) {
    console.error("API /filterOptions error:", err);
    res.status(500).json({ error: err.message });
  }
}
