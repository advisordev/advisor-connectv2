import React, { useState, useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import { GlobalStyles } from '@mui/material';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MenuItemMUI,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckIcon from '@mui/icons-material/Check';

const columns = [
  { key: 'First Name', label: 'First Name' },
  { key: 'Last Name',  label: 'Last Name' },
  { key: 'Team Name',  label: 'Team Name' },
  { key: 'Title',      label: 'Title' },
  { key: 'Firm',       label: 'Firm' },
  { key: 'Branch',     label: 'Branch' },
  { key: 'City',       label: 'City' },
  { key: 'Province',   label: 'Province' },
];

export default function Dashboard() {
  const router = useRouter();

  const handleHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleAbout = () => {
    router.push('/about');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white', width: '100%' }}>
      <GlobalStyles styles={{ 'html, body': { margin: 0, padding: 0 } }} />

      <Box
        sx={{
          backgroundColor: '#e6d3bc',
          width: '100%',
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#1E293B' }}>
          Advisor Dashboard
        </Typography>
        <Button
          onClick={handleHome}
          sx={{
            color: '#374151',
            fontWeight: 600,
            mr: 3,
            fontSize: '1.1rem',
            textTransform: 'none',
            ':hover': { color: '#1D4ED8' },
          }}
        >
          Home
        </Button>
        <Button
          onClick={handleAbout}
          sx={{
            color: '#374151',
            fontWeight: 600,
            mr: 3,
            fontSize: '1.1rem',
            textTransform: 'none',
            ':hover': { color: '#1D4ED8' },
          }}
        >
          About
        </Button>
        <AccountMenu />
      </Box>

      <Container maxWidth="lg" sx={{ mt: 0, px: { xs: 2, sm: 0 } }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
  <Typography 
    variant="h4" 
    sx={{ 
      fontWeight: 'bold', 
      color: '#111827',
      fontSize: '2.2rem',
      letterSpacing: '-0.02em'
    }}
  >
    Welcome, Chris
  </Typography>
  <Typography 
    variant="subtitle2" 
    sx={{ 
      color: '#64748B', 
      mt: 1.5,
      fontSize: '0.95rem',
      fontWeight: 500
    }}
  >
    Last login: <span>Loading...</span>
  </Typography>
  <Typography 
    variant="body1" 
    sx={{ 
      color: '#475569', 
      mt: 1.5,
      fontStyle: 'italic',
      fontSize: '1rem',
      borderLeft: '3px solid #e6d3bc',
      pl: 2,
      py: 0.5
    }}
  >
    Latest News: Stay updated with the market insights.
  </Typography>
</Paper>
        <RecordsSection />
      </Container>
    </Box>
  );
}

// Added display name to the component to fix ESLint error
const RecordsSection = memo(() => {
  const [page, setPage] = useState(1);
  const limit = 100;
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState('First Name');
  const [sortDir, setSortDir] = useState('asc');
  const [filterProvince, setFilterProvince] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterFirm, setFilterFirm] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [tempFilterProvince, setTempFilterProvince] = useState('');
  const [tempFilterCity, setTempFilterCity] = useState('');
  const [tempFilterFirm, setTempFilterFirm] = useState('');
  const [tempFilterTeam, setTempFilterTeam] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gotoPage, setGotoPage] = useState('');
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [firmOptions, setFirmOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [favoriteDialogOpen, setFavoriteDialogOpen] = useState(false);
  const [favoriteRow, setFavoriteRow] = useState(null);
  const [favoriteListSelection, setFavoriteListSelection] = useState('');
  const [newFavoriteListName, setNewFavoriteListName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [recentlyFavoritedId, setRecentlyFavoritedId] = useState(null);

  const getFavoriteLists = () => {
    try {
      return JSON.parse(localStorage.getItem('favoriteLists')) || {};
    } catch {
      // Removed unused 'err' variable to fix ESLint error
      return {};
    }
  };

  const saveFavoriteLists = (lists) => {
    localStorage.setItem('favoriteLists', JSON.stringify(lists));
  };

  useEffect(() => {
    const params = new URLSearchParams({
      province: tempFilterProvince,
      city: tempFilterCity,
      firm: tempFilterFirm,
      team: tempFilterTeam,
    });
    fetch('/api/filterOptions?' + params.toString())
      .then(res => res.json())
      .then(result => {
        if (!result) return;
        setProvinceOptions(result.provinces || []);
        setCityOptions(result.cities || []);
        setFirmOptions(result.firms || []);
        setTeamOptions(result.teams || []);
      })
      .catch(err => console.error('Error fetching filter options:', err));
  }, [tempFilterProvince, tempFilterCity, tempFilterFirm, tempFilterTeam]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sortBy,
      sortDir,
      province: filterProvince,
      city: filterCity,
      firm: filterFirm,
      team: filterTeam,
    });
    fetch(`/api/data?${params.toString()}`)
      .then(res => res.json())
      .then(result => {
        if (!isMounted) return;
        if (!result || !Array.isArray(result.data) || typeof result.total !== 'number') {
          setError('API returned unexpected data format');
          setLoading(false);
          return;
        }
        setData(result.data);
        setTotal(result.total);
        setLoading(false);
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err.message || 'API error');
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, [page, sortBy, sortDir, filterProvince, filterCity, filterFirm, filterTeam]);

  const handleSort = (colKey) => {
    if (colKey === sortBy) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(colKey);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(total / limit)) return;
    setPage(newPage);
  };

  const doApplyFilters = () => {
    setFilterProvince(tempFilterProvince);
    setFilterCity(tempFilterCity);
    setFilterFirm(tempFilterFirm);
    setFilterTeam(tempFilterTeam);
    setPage(1);
  };

  const doResetFilters = () => {
    setTempFilterProvince('');
    setTempFilterCity('');
    setTempFilterFirm('');
    setTempFilterTeam('');
    setFilterProvince('');
    setFilterCity('');
    setFilterFirm('');
    setFilterTeam('');
    setPage(1);
  };

  const openFavoriteDialog = (row) => {
    setFavoriteRow(row);
    const lists = getFavoriteLists();
    const listNames = Object.keys(lists);
    setFavoriteListSelection(listNames.length > 0 ? listNames[0] : 'new');
    setNewFavoriteListName('');
    setFavoriteDialogOpen(true);
  };

  const closeFavoriteDialog = () => {
    setFavoriteDialogOpen(false);
    setFavoriteRow(null);
    setNewFavoriteListName('');
  };

  const addToFavorites = () => {
    const lists = getFavoriteLists();
    let targetList = favoriteListSelection;
    
    if (favoriteListSelection === 'new') {
      if (!newFavoriteListName.trim()) {
        setSnackbarMessage('Please enter a valid list name');
        setSnackbarOpen(true);
        return;
      }
      targetList = newFavoriteListName.trim();
      if (lists[targetList]) {
        setSnackbarMessage('A list with this name already exists');
        setSnackbarOpen(true);
        return;
      }
      lists[targetList] = [];
    }

    const uniqueKey = favoriteRow['Email'] || JSON.stringify(favoriteRow);
    if (lists[targetList].find((r) => (r['Email'] || JSON.stringify(r)) === uniqueKey)) {
      setSnackbarMessage('This advisor is already in your favorites');
      setSnackbarOpen(true);
    } else {
      lists[targetList].push(favoriteRow);
      saveFavoriteLists(lists);
      setRecentlyFavoritedId(uniqueKey);
      setTimeout(() => setRecentlyFavoritedId(null), 2000);
      setSnackbarMessage(`Added to "${targetList}" favorites`);
      setSnackbarOpen(true);
      closeFavoriteDialog();
    }
  };

  const openInfoDialog = (row) => {
    setSelectedRow(row);
  };

  const closeInfoDialog = () => {
    setSelectedRow(null);
  };

  function Pagination() {
    const windowSize = 2;
    const pages = [];
    const pushPage = (pg) => {
      if (!pages.includes(pg) && pg >= 1 && pg <= Math.ceil(total / limit)) pages.push(pg);
    };
    pushPage(1);
    pushPage(Math.ceil(total / limit));
    for (let i = page - windowSize; i <= page + windowSize; i++) {
      pushPage(i);
    }
    pages.sort((a, b) => a - b);
    const finalPages = [];
    for (let i = 0; i < pages.length; i++) {
      finalPages.push(pages[i]);
      if (i < pages.length - 1 && pages[i + 1] - pages[i] > 1) {
        finalPages.push('...');
      }
    }
    return (
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          sx={{
            color: '#e6d3bc',
            borderColor: '#e6d3bc',
            ':hover': { backgroundColor: '#e6d3bc', color: '#ffffff', borderColor: '#e6d3bc' },
          }}
        >
          &lt; Prev
        </Button>
        {finalPages.map((pg, idx) =>
          pg === '...' ? (
            <Button
              key={`ellipsis-${idx}`}
              variant="outlined"
              sx={{
                color: '#e6d3bc',
                borderColor: '#e6d3bc',
                ':hover': { backgroundColor: '#e6d3bc', color: '#ffffff', borderColor: '#e6d3bc' },
              }}
            >
              ...
            </Button>
          ) : (
            <Button
              key={pg}
              onClick={() => handlePageChange(pg)}
              variant={pg === page ? 'contained' : 'outlined'}
              sx={{
                minWidth: '40px',
                ...(pg === page
                  ? { backgroundColor: '#e6d3bc', color: '#fff' }
                  : { color: '#e6d3bc', borderColor: '#e6d3bc' }),
              }}
            >
              {pg}
            </Button>
          )
        )}
        <Button
          variant="outlined"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= Math.ceil(total / limit)}
          sx={{
            color: '#e6d3bc',
            borderColor: '#e6d3bc',
            ':hover': { backgroundColor: '#e6d3bc', color: '#ffffff', borderColor: '#e6d3bc' },
          }}
        >
          Next &gt;
        </Button>
      </Box>
    );
  }

  const renderRow = (row, idx) => {
    const uniqueKey = row['Email'] || JSON.stringify(row);
    const isRecentlyFavorited = recentlyFavoritedId === uniqueKey;
    
    return (
      <TableRow hover key={idx}>
        {columns.map((col) => (
          <TableCell key={col.key} sx={{ color: '#374151' }}>
            {row[col.key] ?? ''}
          </TableCell>
        ))}
        <TableCell sx={{ color: '#374151' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={() => openInfoDialog(row)}
              sx={{ p: 0, minWidth: 'auto', color: '#e6d3bc', ':hover': { color: '#9a8a6d' } }}
            >
              <InfoIcon fontSize="small" />
            </Button>
            <Button
              onClick={() => openFavoriteDialog(row)}
              sx={{ 
                p: 0, 
                minWidth: 'auto', 
                ml: 1,
                position: 'relative',
                color: isRecentlyFavorited ? '#4caf50' : '#e6d3bc',
                transition: 'color 0.3s ease',
                ':hover': { color: '#9a8a6d' } 
              }}
            >
              {isRecentlyFavorited ? (
                <CheckIcon fontSize="small" />
              ) : (
                <FavoriteIcon fontSize="small" />
              )}
            </Button>
            {row['Email'] && row['Email'] !== '' && (
              <Button
                onClick={() => window.open(`mailto:${row['Email']}`, '_blank')}
                sx={{ p: 0, minWidth: 'auto', ml: 1, color: '#e6d3bc', ':hover': { color: '#9a8a6d' } }}
              >
                <EmailIcon fontSize="small" />
              </Button>
            )}
            {(() => {
              const websiteUrl =
                (row['Team Website URL'] && typeof row['Team Website URL'] === 'object'
                  ? row['Team Website URL'].url
                  : row['Team Website URL']) ||
                (row['Team Website'] && typeof row['Team Website'] === 'object'
                  ? row['Team Website'].url
                  : row['Team Website']) ||
                '';
              return websiteUrl && websiteUrl !== '' ? (
                <Button
                  onClick={() => window.open(websiteUrl, '_blank')}
                  sx={{ p: 0, minWidth: 'auto', ml: 1, color: '#e6d3bc', ':hover': { color: '#9a8a6d' } }}
                >
                  <LanguageIcon fontSize="small" />
                </Button>
              ) : null;
            })()}
            {(() => {
              const linkedinUrl =
                (row['Linkedin URL'] && typeof row['Linkedin URL'] === 'object'
                  ? row['Linkedin URL'].url
                  : row['Linkedin URL']) ||
                (row['Linkedin'] && typeof row['Linkedin'] === 'object'
                  ? row['Linkedin'].url
                  : row['Linkedin']) ||
                '';
              return linkedinUrl && linkedinUrl !== '' ? (
                <Button
                  onClick={() => window.open(linkedinUrl, '_blank')}
                  sx={{ p: 0, minWidth: 'auto', ml: 1, color: '#e6d3bc', ':hover': { color: '#9a8a6d' } }}
                >
                  <LinkedInIcon fontSize="small" />
                </Button>
              ) : null;
            })()}
            <Button
              onClick={() => alert('Report Issue')}
              sx={{ p: 0, minWidth: 'auto', ml: 1, color: 'red', ':hover': { color: '#9a8a6d' } }}
            >
              <ReportProblemIcon fontSize="small" />
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box sx={{ mb: 8 }}>
      <Paper sx={{ p: 3, mb: 4, mx: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" size="small" fullWidth sx={{ minWidth: 200 }}>
              <InputLabel>Province</InputLabel>
              <Select
                label="Province"
                value={tempFilterProvince}
                onChange={(e) => setTempFilterProvince(e.target.value)}
              >
                <MenuItemMUI value="">All Provinces</MenuItemMUI>
                {provinceOptions.map((p) => (
                  <MenuItemMUI key={p} value={p}>{p}</MenuItemMUI>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" size="small" fullWidth sx={{ minWidth: 200 }}>
              <InputLabel>City</InputLabel>
              <Select
                label="City"
                value={tempFilterCity}
                onChange={(e) => setTempFilterCity(e.target.value)}
              >
                <MenuItemMUI value="">All Cities</MenuItemMUI>
                {cityOptions.map((c) => (
                  <MenuItemMUI key={c} value={c}>{c}</MenuItemMUI>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" size="small" fullWidth sx={{ minWidth: 200 }}>
              <InputLabel>Firm</InputLabel>
              <Select
                label="Firm"
                value={tempFilterFirm}
                onChange={(e) => setTempFilterFirm(e.target.value)}
              >
                <MenuItemMUI value="">All Firms</MenuItemMUI>
                {firmOptions.map((f) => (
                  <MenuItemMUI key={f} value={f}>{f}</MenuItemMUI>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" size="small" fullWidth sx={{ minWidth: 200 }}>
              <InputLabel>Team</InputLabel>
              <Select
                label="Team"
                value={tempFilterTeam}
                onChange={(e) => setTempFilterTeam(e.target.value)}
              >
                <MenuItemMUI value="">All Teams</MenuItemMUI>
                {teamOptions.map((t) => (
                  <MenuItemMUI key={t} value={t}>{t}</MenuItemMUI>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              textTransform: 'none',
              backgroundColor: '#e6d3bc',
              ':hover': { backgroundColor: '#e6d3bc', color: '#fff' },
            }}
            onClick={doApplyFilters}
          >
            Apply Filters
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              color: '#e6d3bc',
              borderColor: '#e6d3bc',
              ':hover': { backgroundColor: '#e6d3bc', color: '#fff', borderColor: '#e6d3bc' },
            }}
            onClick={doResetFilters}
          >
            Reset
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mx: 2, mb: 4, border: '1px solid #e5e7eb', borderRadius: '4px' }}>
        {loading && data.length === 0 ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <TableContainer sx={{ height: 900, overflowY: 'auto', px: 2 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#e6d3bc' }}>
                    {columns.map((col) => {
                      const activeSort = col.key === sortBy;
                      return (
                        <TableCell
                          key={col.key}
                          sx={{ fontWeight: 'bold', cursor: 'pointer', color: '#111827' }}
                          onClick={() => handleSort(col.key)}
                        >
                          {col.label}{' '}
                          {activeSort &&
                            (sortDir === 'asc' ? (
                              <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5, color: '#111827' }} />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5, color: '#111827' }} />
                            ))}
                        </TableCell>
                      );
                    })}
                    <TableCell sx={{ fontWeight: 'bold', color: '#111827', backgroundColor: 'white' }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1}>
                        <Typography textAlign="center" sx={{ color: '#6B7280' }}>
                          No data available.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((row, idx) => renderRow(row, idx))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {!loading && !error && data.length > 0 && (
              <Box>
                <Pagination />
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <TextField
                    label="Go to Page"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100px' }}
                    value={gotoPage}
                    onChange={(e) => setGotoPage(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const p = parseInt(gotoPage, 10);
                      if (Number.isNaN(p)) return;
                      if (p < 1) handlePageChange(1);
                      else if (p > Math.ceil(total / limit)) handlePageChange(Math.ceil(total / limit));
                      else handlePageChange(p);
                      setGotoPage('');
                    }}
                    sx={{
                      color: '#e6d3bc',
                      borderColor: '#e6d3bc',
                      ':hover': { backgroundColor: '#e6d3bc', color: '#ffffff', borderColor: '#e6d3bc' },
                    }}
                  >
                    Go
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}
      </Paper>

      {selectedRow && (
  <Dialog 
    open={true} 
    onClose={closeInfoDialog} 
    fullWidth 
    maxWidth="md"
    PaperProps={{
      sx: {
        borderRadius: '12px',
        maxHeight: '90vh' // Ensure dialog doesn't exceed viewport height
      }
    }}
  >
    <DialogTitle 
      sx={{ 
        backgroundColor: '#e6d3bc', 
        color: '#1E293B', 
        fontWeight: 'bold', 
        p: 3, 
        fontSize: '1.5rem',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Advisor Details</Typography>
    </DialogTitle>

    <DialogContent sx={{ p: 0, backgroundColor: '#f9f7f4' }}>
      {/* Header with name and title */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#111827', mb: 1 }}>
          {selectedRow['First Name']} {selectedRow['Last Name']}
        </Typography>
        <Typography variant="h6" sx={{ color: '#6B7280', fontWeight: 'normal' }}>
          {selectedRow['Title'] || 'Advisor'} at {selectedRow['Firm']}
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Left column - Professional info */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
            }}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                color: '#111827', 
                fontWeight: 'bold',
                borderBottom: '2px solid #e6d3bc',
                pb: 1,
                display: 'inline-block'
              }}>
                Professional Information
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontWeight: 500 }}>Team Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: selectedRow['Team Name'] ? 'medium' : 'normal' }}>
                  {selectedRow['Team Name'] || 'N/A'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontWeight: 500 }}>Firm</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {selectedRow['Firm'] || 'N/A'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontWeight: 500 }}>Branch</Typography>
                <Typography variant="body1">
                  {selectedRow['Branch'] || 'N/A'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontWeight: 500 }}>Title</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {selectedRow['Title'] || 'N/A'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          {/* Right column - Contact info */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              backgroundColor: 'white', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
            }}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                color: '#111827', 
                fontWeight: 'bold',
                borderBottom: '2px solid #e6d3bc',
                pb: 1,
                display: 'inline-block'
              }}>
                Contact Information
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontWeight: 500 }}>Address</Typography>
                <Typography variant="body1">
                  {selectedRow['Address'] || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  {[
                    selectedRow['City'] || '', 
                    selectedRow['Province'] || ''
                  ].filter(Boolean).join(', ')}
                  {selectedRow['Postal Code'] ? ` ${selectedRow['Postal Code']}` : ''}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                  Business Phone
                </Typography>
                {selectedRow['Business Phone'] ? (
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                      onClick={() => window.open(`tel:${selectedRow['Business Phone']}`, '_blank')}
                      sx={{ 
                        color: '#4B5563', 
                        p: 0, 
                        textTransform: 'none',
                        fontWeight: 'medium',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: 'transparent', color: '#1D4ED8' }
                      }}
                    >
                      {selectedRow['Business Phone']}
                    </Button>
                  </Typography>
                ) : (
                  <Typography variant="body1">N/A</Typography>
                )}
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, fontWeight: 500 }}>Email</Typography>
                {selectedRow['Email'] ? (
                  <Button 
                    startIcon={<EmailIcon />}
                    onClick={() => window.open(`mailto:${selectedRow['Email']}`, '_blank')}
                    sx={{ 
                      color: '#1D4ED8', 
                      p: 0, 
                      textTransform: 'none',
                      fontWeight: 'medium',
                      '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                    }}
                  >
                    {selectedRow['Email']}
                  </Button>
                ) : (
                  <Typography variant="body1">N/A</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Bottom row - Online presence */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          mt: 3, 
          mb: 3,
          backgroundColor: 'white', 
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}>
          <Typography variant="h6" sx={{ 
            mb: 3, 
            color: '#111827', 
            fontWeight: 'bold',
            borderBottom: '2px solid #e6d3bc',
            pb: 1,
            display: 'inline-block'
          }}>
            Online Presence
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Team Website Button */}
            {(() => {
              const siteUrl = (selectedRow['Team Website URL'] && typeof selectedRow['Team Website URL'] === 'object'
                ? selectedRow['Team Website URL'].url
                : selectedRow['Team Website URL']) ||
                (selectedRow['Team Website'] && typeof selectedRow['Team Website'] === 'object'
                  ? selectedRow['Team Website'].url
                  : selectedRow['Team Website']);
              return siteUrl ? (
                <Button
                  variant="contained"
                  startIcon={<LanguageIcon />}
                  onClick={() => window.open(siteUrl, '_blank')}
                  sx={{
                    backgroundColor: '#e6d3bc',
                    color: '#1E293B',
                    px: 3,
                    py: 1.2,
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                    '&:hover': {
                      backgroundColor: '#d6c3ac',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.12)',
                    }
                  }}
                >
                  Team Website
                </Button>
              ) : null;
            })()}
            
            {/* LinkedIn Button */}
            {(() => {
              const linkedUrl = (selectedRow['Linkedin URL'] && typeof selectedRow['Linkedin URL'] === 'object'
                ? selectedRow['Linkedin URL'].url
                : selectedRow['Linkedin URL']) ||
                (selectedRow['Linkedin'] && typeof selectedRow['Linkedin'] === 'object'
                  ? selectedRow['Linkedin'].url
                  : selectedRow['Linkedin']);
              return linkedUrl ? (
                <Button
                  variant="contained"
                  startIcon={<LinkedInIcon />}
                  onClick={() => window.open(linkedUrl, '_blank')}
                  sx={{
                    backgroundColor: '#0A66C2',
                    color: 'white',
                    px: 3,
                    py: 1.2,
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                    '&:hover': {
                      backgroundColor: '#0958A7',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.12)',
                    }
                  }}
                >
                  LinkedIn Profile
                </Button>
              ) : null;
            })()}
          </Box>
        </Paper>
      </Box>
    </DialogContent>

    <DialogActions sx={{ 
      p: 3, 
      borderTop: '1px solid #e5e7eb', 
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <Button 
        onClick={() => openFavoriteDialog(selectedRow)}
        startIcon={<FavoriteIcon />}
        variant="outlined"
        sx={{
          color: '#e6d3bc',
          borderColor: '#e6d3bc',
          borderRadius: '6px',
          fontWeight: 'medium',
          textTransform: 'none',
          px: 3,
          '&:hover': {
            backgroundColor: 'rgba(230, 211, 188, 0.1)',
            borderColor: '#d6c3ac'
          }
        }}
      >
        Add to Favorites
      </Button>
      <Button 
        onClick={closeInfoDialog} 
        variant="contained"
        sx={{
          backgroundColor: '#e6d3bc',
          color: '#1E293B',
          borderRadius: '6px',
          fontWeight: 'bold',
          textTransform: 'none',
          px: 3,
          py: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          '&:hover': {
            backgroundColor: '#d6c3ac',
            boxShadow: '0 4px 6px rgba(0,0,0,0.12)',
          }
        }}
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
)}
      <Dialog open={favoriteDialogOpen} onClose={closeFavoriteDialog} fullWidth maxWidth="xs">
        <DialogTitle>Add to Favorites</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Choose an existing favorites list or create a new one:
          </Typography>
          <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
            <InputLabel>Favorites List</InputLabel>
            <Select
              label="Favorites List"
              value={favoriteListSelection}
              onChange={(e) => setFavoriteListSelection(e.target.value)}
            >
              {Object.keys(getFavoriteLists()).map((listName) => (
                <MenuItemMUI key={listName} value={listName}>
                  {listName}
                </MenuItemMUI>
              ))}
              <MenuItemMUI value="new">Create New List</MenuItemMUI>
            </Select>
          </FormControl>
          {favoriteListSelection === 'new' && (
            <TextField
              label="New List Name"
              variant="outlined"
              size="small"
              fullWidth
              value={newFavoriteListName}
              onChange={(e) => setNewFavoriteListName(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFavoriteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={addToFavorites} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
});

// Add display name to fix the ESLint error
RecordsSection.displayName = 'RecordsSection';

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMouseEnter = (event) => setAnchorEl(event.currentTarget);
  const handleMouseLeave = () => setAnchorEl(null);

  const handleAccountInfo = () => {
    alert('Account Info clicked');
    handleMouseLeave();
  };
  const handleChangePassword = () => {
    alert('Change Password clicked');
    handleMouseLeave();
  };
  const handleFavorites = () => {
    window.location.href = '/favorites';
    handleMouseLeave();
  };
  const handleLogout = () => {
    alert('Logout clicked');
    handleMouseLeave();
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ position: 'relative', display: 'inline-block' }}
    >
      <Button
        sx={{
          color: '#374151',
          fontWeight: 'bold',
          textTransform: 'none',
          fontSize: '1.1rem',
          ':hover': { color: '#2563EB' },
        }}
      >
        Account
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMouseLeave}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{ onMouseLeave: handleMouseLeave }}
      >
        <MenuItem onClick={handleAccountInfo}>Account Info</MenuItem>
        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        <MenuItem onClick={handleFavorites}>Favorites</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}