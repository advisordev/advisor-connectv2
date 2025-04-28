import React, { useState, useEffect, memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { GlobalStyles } from '@mui/material';
import Image from 'next/image';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
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
  Alert,
  Tooltip,
  Fade,
  Divider,
  Chip
} from '@mui/material';

// Import icons
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckIcon from '@mui/icons-material/Check';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

// Define table columns
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

  // Enhanced copy protection for the entire dashboard
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    
    const handleKeyDown = (e) => {
      // Prevent common copying keyboard shortcuts
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'p' || e.key === 's')) ||
        (e.metaKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'p' || e.key === 's')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        return false;
      }
    };
    
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const handleHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleAbout = () => {
    router.push('/about');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      width: '100%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      WebkitTouchCallout: 'none'
    }}>
      <GlobalStyles styles={{ 
        'html, body': { 
          margin: 0, 
          padding: 0,
          '& ::selection': {
            background: 'transparent',
          },
          '& ::-moz-selection': {
            background: 'transparent',
          }
        },
        'img': {
          '-webkit-user-drag': 'none',
          '-khtml-user-drag': 'none',
          '-moz-user-drag': 'none',
          '-o-user-drag': 'none',
          'user-drag': 'none'
        }
      }} />

      <style jsx global>{`
        @media print {
          body {
            display: none !important;
          }
        }
      `}</style>

      {/* Header/Navigation Bar */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #E5D3BC 0%, #e9d9c6 100%)',
          width: '100%',
          px: '50px', // Changed from 4 to 50px
          py: 2,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logo.png" 
            alt="Advisor Connect"
            width={200}         
            height={74}         
            style={{
              marginRight: '24px',
              objectFit: 'contain',
              marginLeft: '-8px',
              transition: 'transform 0.2s ease-in-out',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onClick={handleHome}
          />
        </Box>
        <Button
          onClick={handleHome}
          sx={{
            color: '#374151',
            fontWeight: 600,
            mr: 3,
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: '8px',
            px: 2,
            py: 1,
            '&:hover': { 
              color: '#1D4ED8',
              backgroundColor: 'rgba(29, 78, 216, 0.04)'
            },
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
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: '8px',
            px: 2,
            py: 1,
            '&:hover': { 
              color: '#1D4ED8',
              backgroundColor: 'rgba(29, 78, 216, 0.04)'
            },
          }}
        >
          About
        </Button>
        <AccountMenu />
      </Box>

      {/* Main Content Container - Changed from Container to Box for custom width */}
      <Box sx={{ 
        mt: 4, 
        px: '50px', // Changed to 50px padding on each side
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Welcome Section */}
        <Fade in={true} timeout={800}>
          <Paper elevation={0} sx={{ 
            p: 4, 
            mb: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #faf8f7 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: 'radial-gradient(circle at top right, rgba(229,211,188,0.1) 0%, transparent 70%)',
              zIndex: 0
            }
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#111827',
                  fontSize: '2.5rem',
                  letterSpacing: '-0.02em',
                  mb: 1,
                  lineHeight: 1.2
                }}
              >
                Welcome back, Chris
              </Typography>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: '#64748B', 
                  fontSize: '1rem',
                  fontWeight: 500,
                  mb: 3
                }}
              >
                Last login: <span>Loading...</span>
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#475569', 
                  fontSize: '1.1rem',
                  borderLeft: '4px solid #E5D3BC',
                  pl: 2.5,
                  py: 1,
                  backgroundColor: 'rgba(229,211,188,0.06)',
                  borderRadius: '0 8px 8px 0',
                  maxWidth: '600px'
                }}
              >
                Latest News: Stay updated with the market insights and trends.
              </Typography>
            </Box>
          </Paper>
        </Fade>
        
        {/* Records Section Component */}
        <RecordsSection />
      </Box>
    </Box>
  );
}

// RecordsSection component with memo for optimization
const RecordsSection = memo(() => {
  // State declarations
  const [page, setPage] = useState(1);
  const limit = 100;
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState('First Name');
  const [sortDir, setSortDir] = useState('asc');
  
  // Filter states
  const [filterProvince, setFilterProvince] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterFirm, setFilterFirm] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [filterFavorites, setFilterFavorites] = useState('');
  const [filterReports, setFilterReports] = useState('');
  
  // Temporary filter states (for form)
  const [tempFilterProvince, setTempFilterProvince] = useState('');
  const [tempFilterCity, setTempFilterCity] = useState('');
  const [tempFilterFirm, setTempFilterFirm] = useState('');
  const [tempFilterTeam, setTempFilterTeam] = useState('');
  const [tempFilterFavorites, setTempFilterFavorites] = useState('');
  const [tempFilterReports, setTempFilterReports] = useState('');
  
  // Data and UI states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gotoPage, setGotoPage] = useState('');
  
  // Filter options
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [firmOptions, setFirmOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [favoritesListOptions, setFavoritesListOptions] = useState([]);
  const [reportListOptions, setReportListOptions] = useState([]);
  
  // Dialog states
  const [selectedRow, setSelectedRow] = useState(null);
  const [favoriteDialogOpen, setFavoriteDialogOpen] = useState(false);
  const [favoriteRow, setFavoriteRow] = useState(null);
  const [favoriteListSelection, setFavoriteListSelection] = useState('');
  const [newFavoriteListName, setNewFavoriteListName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [recentlyFavoritedId, setRecentlyFavoritedId] = useState(null);

  // New states for Report functionality
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [newReportName, setNewReportName] = useState('');

  // Favorites management functions
  const getFavoriteLists = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem('favoriteLists')) || {};
    } catch {
      return {};
    }
  }, []);

  const saveFavoriteLists = useCallback((lists) => {
    localStorage.setItem('favoriteLists', JSON.stringify(lists));
  }, []);

  // Report management functions
  const getReportLists = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem('reportLists')) || {};
    } catch {
      return {};
    }
  }, []);

  const saveReportLists = useCallback((lists) => {
    localStorage.setItem('reportLists', JSON.stringify(lists));
  }, []);

  // Save current filtered data as report
  const saveAsReport = async () => {
    if (!newReportName.trim()) {
      setSnackbarMessage('Please enter a valid report name');
      setSnackbarOpen(true);
      return;
    }

    const reports = getReportLists();
    if (reports[newReportName]) {
      setSnackbarMessage('A report with this name already exists');
      setSnackbarOpen(true);
      return;
    }

    // Fetch ALL data with current filters (not just current page)
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '10000', // Large number to get all rows
        sortBy,
        sortDir,
        province: filterProvince,
        city: filterCity,
        firm: filterFirm,
        team: filterTeam,
        favorites: filterFavorites,
      });
      
      const response = await fetch(`/api/data?${params.toString()}`);
      const result = await response.json();
      
      if (!result || !Array.isArray(result.data)) {
        setSnackbarMessage('Error fetching data for report');
        setSnackbarOpen(true);
        return;
      }
      
      let allData = result.data;
      
      // If a favorites list is selected, filter the data client-side
      if (filterFavorites) {
        const lists = getFavoriteLists();
        const favoritesList = lists[filterFavorites] || [];
        const favoritesEmails = favoritesList.map(item => item.Email);
        
        allData = allData.filter(row => 
          favoritesEmails.includes(row.Email)
        );
      }
      
      // Save all filtered data
      reports[newReportName] = allData;
      saveReportLists(reports);
      
      setSnackbarMessage(`Saved report "${newReportName}" with ${allData.length} advisors`);
      setSnackbarOpen(true);
      setReportDialogOpen(false);
      setNewReportName('');
    } catch (error) {
      console.error('Error saving report:', error);
      setSnackbarMessage('Error saving report');
      setSnackbarOpen(true);
    }
  };

  // Fetch filter options whenever temporary filters change
  useEffect(() => {
    // Load favorites list options from localStorage
    const favoriteLists = getFavoriteLists();
    setFavoritesListOptions(Object.keys(favoriteLists));
    
    // Load report list options from localStorage
    const reportLists = getReportLists();
    setReportListOptions(Object.keys(reportLists));
    
    const params = new URLSearchParams({
      province: tempFilterProvince,
      city: tempFilterCity,
      firm: tempFilterFirm,
      team: tempFilterTeam,
    });
    
    fetch('/api/filterOptions?' + params.toString())
      .then(res => res.json())
      .then(async result => {
        if (!result) return;
        
        // If a favorites list is selected, filter the options to only include
        // values that exist in the favorites list
        if (tempFilterFavorites) {
          const favoritesList = favoriteLists[tempFilterFavorites] || [];
          
          // First, get all data with current filters to know what's available
          const dataParams = new URLSearchParams({
            province: tempFilterProvince,
            city: tempFilterCity,
            firm: tempFilterFirm,
            team: tempFilterTeam,
            limit: '10000' // Get all matching records
          });
          
          const dataResponse = await fetch('/api/data?' + dataParams.toString());
          const dataResult = await dataResponse.json();
          
          // Filter data to only include favorites
          const favoritesEmails = favoritesList.map(item => item.Email);
          const filteredData = dataResult.data.filter(row => 
            favoritesEmails.includes(row.Email)
          );
          
          // Extract unique values for each filter from the favorites
          const favProvinces = [...new Set(filteredData.map(row => row.Province).filter(Boolean))];
          const favCities = [...new Set(filteredData.map(row => row.City).filter(Boolean))];
          const favFirms = [...new Set(filteredData.map(row => row.Firm).filter(Boolean))];
          const favTeams = [...new Set(filteredData.map(row => row['Team Name']).filter(Boolean))];
          
          // Intersect with the available options
          setProvinceOptions(result.provinces.filter(p => favProvinces.includes(p)));
          setCityOptions(result.cities.filter(c => favCities.includes(c)));
          setFirmOptions(result.firms.filter(f => favFirms.includes(f)));
          setTeamOptions(result.teams.filter(t => favTeams.includes(t)));
        } else if (tempFilterReports) {
          // If a report list is selected, filter the options to only include
          // values that exist in the report list
          const reportList = reportLists[tempFilterReports] || [];
          
          // Extract unique values for each filter from the report
          const repProvinces = [...new Set(reportList.map(row => row.Province).filter(Boolean))];
          const repCities = [...new Set(reportList.map(row => row.City).filter(Boolean))];
          const repFirms = [...new Set(reportList.map(row => row.Firm).filter(Boolean))];
          const repTeams = [...new Set(reportList.map(row => row['Team Name']).filter(Boolean))];
          
          // Intersect with the available options
          setProvinceOptions(result.provinces.filter(p => repProvinces.includes(p)));
          setCityOptions(result.cities.filter(c => repCities.includes(c)));
          setFirmOptions(result.firms.filter(f => repFirms.includes(f)));
          setTeamOptions(result.teams.filter(t => repTeams.includes(t)));
        } else {
          setProvinceOptions(result.provinces || []);
          setCityOptions(result.cities || []);
          setFirmOptions(result.firms || []);
          setTeamOptions(result.teams || []);
        }
      })
      .catch(err => console.error('Error fetching filter options:', err));
  }, [tempFilterProvince, tempFilterCity, tempFilterFirm, tempFilterTeam, tempFilterFavorites, tempFilterReports, getFavoriteLists, getReportLists]);

  // Fetch data whenever page, sorting, or filters change
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
      favorites: filterFavorites,
      reports: filterReports,
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
        
        // If a favorites list is selected, filter the data client-side
        if (filterFavorites) {
          const lists = getFavoriteLists();
          const favoritesList = lists[filterFavorites] || [];
          const favoritesEmails = favoritesList.map(item => item.Email);
          
          const filteredData = result.data.filter(row => 
            favoritesEmails.includes(row.Email)
          );
          
          setData(filteredData);
          setTotal(filteredData.length);
        } else if (filterReports) {
          // If a report list is selected, filter the data client-side
          const reports = getReportLists();
          const reportList = reports[filterReports] || [];
          const reportEmails = reportList.map(item => item.Email);
          
          const filteredData = result.data.filter(row => 
            reportEmails.includes(row.Email)
          );
          
          setData(filteredData);
          setTotal(filteredData.length);
        } else {
          setData(result.data);
          setTotal(result.total);
        }
        
        setLoading(false);
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err.message || 'API error');
        setLoading(false);
      });
      
    return () => { isMounted = false; };
  }, [page, sortBy, sortDir, filterProvince, filterCity, filterFirm, filterTeam, filterFavorites, filterReports, getFavoriteLists, getReportLists]);

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
    setFilterFavorites(tempFilterFavorites);
    setFilterReports(tempFilterReports);
    setPage(1);
  };

  const doResetFilters = () => {
    setTempFilterProvince('');
    setTempFilterCity('');
    setTempFilterFirm('');
    setTempFilterTeam('');
    setTempFilterFavorites('');
    setTempFilterReports('');
    setFilterProvince('');
    setFilterCity('');
    setFilterFirm('');
    setFilterTeam('');
    setFilterFavorites('');
    setFilterReports('');
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
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          sx={{
            color: '#E5D3BC',
            borderColor: '#E5D3BC',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.2s',
            '&:hover': { 
              backgroundColor: '#E5D3BC', 
              color: '#ffffff', 
              borderColor: '#E5D3BC',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            },
            '&:disabled': {
              borderColor: 'rgba(0,0,0,0.12)',
              color: 'rgba(0,0,0,0.26)'
            }
          }}
        >
          ← Prev
        </Button>
        {finalPages.map((pg, idx) =>
          pg === '...' ? (
            <Button
              key={`ellipsis-${idx}`}
              variant="text"
              disabled
              sx={{
                color: '#e9d9c6',
                minWidth: '40px',
                cursor: 'default'
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
                borderRadius: '8px',
                transition: 'all 0.2s',
                ...(pg === page
                  ? { 
                      backgroundColor: '#E5D3BC', 
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#e9d9c6',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }
                    }
                  : { 
                      color: '#E5D3BC', 
                      borderColor: '#E5D3BC',
                      '&:hover': {
                        backgroundColor: 'rgba(229,211,188,0.08)',
                        borderColor: '#E5D3BC',
                        transform: 'translateY(-1px)'
                      }
                    }),
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
            color: '#E5D3BC',
            borderColor: '#E5D3BC',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.2s',
            '&:hover': { 
              backgroundColor: '#E5D3BC', 
              color: '#ffffff', 
              borderColor: '#E5D3BC',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            },
            '&:disabled': {
              borderColor: 'rgba(0,0,0,0.12)',
              color: 'rgba(0,0,0,0.26)'
            }
          }}
        >
          Next →
        </Button>
      </Box>
    );
  }

  const renderRow = (row, idx) => {
    const uniqueKey = row['Email'] || JSON.stringify(row);
    const isRecentlyFavorited = recentlyFavoritedId === uniqueKey;
    
    return (
      <TableRow 
        hover 
        key={idx}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(229,211,188,0.04)'
          }
        }}
      >
        {columns.map((col) => (
          <TableCell key={col.key} sx={{ 
            color: '#374151',
            py: 2,
            borderBottom: '1px solid rgba(0,0,0,0.05)'
          }}>
            {row[col.key] ?? ''}
          </TableCell>
        ))}
        <TableCell sx={{ 
          color: '#374151',
          py: 2,
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title="View Details" arrow>
              <Button
                onClick={() => openInfoDialog(row)}
                sx={{ 
                  p: 1, 
                  minWidth: 'auto', 
                  color: '#E5D3BC',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    backgroundColor: 'rgba(229,211,188,0.1)',
                    transform: 'scale(1.05)'
                  } 
                }}
              >
                <InfoIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="Add to Favorites" arrow>
              <Button
                onClick={() => openFavoriteDialog(row)}
                sx={{ 
                  p: 1, 
                  minWidth: 'auto',
                  borderRadius: '8px',
                  color: isRecentlyFavorited ? '#4caf50' : '#E5D3BC',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    backgroundColor: 'rgba(229,211,188,0.1)',
                    transform: 'scale(1.05)'
                  } 
                }}
              >
                {isRecentlyFavorited ? (
                  <CheckIcon fontSize="small" />
                ) : (
                  <FavoriteIcon fontSize="small" />
                )}
              </Button>
            </Tooltip>
            {row['Email'] && row['Email'] !== '' && (
              <Tooltip title="Send Email" arrow>
                <Button
                  onClick={() => window.open(`mailto:${row['Email']}`, '_blank')}
                  sx={{ 
                    p: 1, 
                    minWidth: 'auto', 
                    color: '#E5D3BC',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    '&:hover': { 
                      backgroundColor: 'rgba(229,211,188,0.1)',
                      transform: 'scale(1.05)'
                    } 
                  }}
                >
                  <EmailIcon fontSize="small" />
                </Button>
              </Tooltip>
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
                <Tooltip title="Visit Website" arrow>
                  <Button
                    onClick={() => window.open(websiteUrl, '_blank')}
                    sx={{ 
                      p: 1, 
                      minWidth: 'auto', 
                      color: '#E5D3BC',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        backgroundColor: 'rgba(229,211,188,0.1)',
                        transform: 'scale(1.05)'
                      } 
                    }}
                  >
                    <LanguageIcon fontSize="small" />
                  </Button>
                </Tooltip>
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
                <Tooltip title="View LinkedIn" arrow>
                  <Button
                    onClick={() => window.open(linkedinUrl, '_blank')}
                    sx={{ 
                      p: 1, 
                      minWidth: 'auto', 
                      color: '#E5D3BC',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        backgroundColor: 'rgba(229,211,188,0.1)',
                        transform: 'scale(1.05)'
                      } 
                    }}
                  >
                    <LinkedInIcon fontSize="small" />
                  </Button>
                </Tooltip>
              ) : null;
            })()}
            <Tooltip title="Report Issue" arrow>
              <Button
                onClick={() => alert('Report Issue')}
                sx={{ 
                  p: 1, 
                  minWidth: 'auto', 
                  color: '#ef4444',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    backgroundColor: 'rgba(239,68,68,0.1)',
                    transform: 'scale(1.05)'
                  } 
                }}
              >
                <ReportProblemIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box sx={{ mb: 8 }}>
      <Fade in={true} timeout={800}>
        <Paper sx={{ 
          p: 3, 
          mb: 4, 
          border: '1px solid rgba(0,0,0,0.05)',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          background: '#ffffff'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterListIcon sx={{ color: '#E5D3BC', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
              Filters
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
              <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Favorites List</InputLabel>
               <Select
                 label="Favorites List"
                 value={tempFilterFavorites}
                 onChange={(e) => {
                   setTempFilterFavorites(e.target.value);
                   // Clear report filter when favorites is selected
                   if (e.target.value) setTempFilterReports('');
                 }}
                 IconComponent={ArrowDropDownIcon}
                 sx={{
                   borderRadius: '8px',
                   '& .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(0,0,0,0.1)'
                   },
                   '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   },
                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   }
                 }}
               >
                 <MenuItemMUI value="">&nbsp;</MenuItemMUI>
                 {favoritesListOptions.map((list) => (
                   <MenuItemMUI key={list} value={list}>{list}</MenuItemMUI>
                 ))}
               </Select>
             </FormControl>
           </Box>
           <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
             <FormControl variant="outlined" size="small" fullWidth>
               <InputLabel>Report List</InputLabel>
               <Select
                 label="Report List"
                 value={tempFilterReports}
                 onChange={(e) => {
                   setTempFilterReports(e.target.value);
                   // Clear favorites filter when report is selected
                   if (e.target.value) setTempFilterFavorites('');
                 }}
                 IconComponent={ArrowDropDownIcon}
                 sx={{
                   borderRadius: '8px',
                   '& .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(0,0,0,0.1)'
                   },
                   '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   },
                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   }
                 }}
               >
                 <MenuItemMUI value="">&nbsp;</MenuItemMUI>
                 {reportListOptions.map((list) => (
                   <MenuItemMUI key={list} value={list}>{list}</MenuItemMUI>
                 ))}
               </Select>
             </FormControl>
           </Box>
           <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
             <FormControl variant="outlined" size="small" fullWidth>
               <InputLabel>Province</InputLabel>
               <Select
                 label="Province"
                 value={tempFilterProvince}
                 onChange={(e) => setTempFilterProvince(e.target.value)}
                 IconComponent={ArrowDropDownIcon}
                 sx={{
                   borderRadius: '8px',
                   '& .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(0,0,0,0.1)'
                   },
                   '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   },
                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   }
                 }}
               >
                 <MenuItemMUI value="">All Provinces</MenuItemMUI>
                 {provinceOptions.map((p) => (
                   <MenuItemMUI key={p} value={p}>{p}</MenuItemMUI>
                 ))}
               </Select>
             </FormControl>
           </Box>
           <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
             <FormControl variant="outlined" size="small" fullWidth>
               <InputLabel>City</InputLabel>
               <Select
                 label="City"
                 value={tempFilterCity}
                 onChange={(e) => setTempFilterCity(e.target.value)}
                 IconComponent={ArrowDropDownIcon}
                 sx={{
                   borderRadius: '8px',
                   '& .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(0,0,0,0.1)'
                   },
                   '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   },
                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   }
                 }}
               >
                 <MenuItemMUI value="">All Cities</MenuItemMUI>
                 {cityOptions.map((c) => (
                   <MenuItemMUI key={c} value={c}>{c}</MenuItemMUI>
                 ))}
               </Select>
             </FormControl>
           </Box>
           <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
             <FormControl variant="outlined" size="small" fullWidth>
               <InputLabel>Firm</InputLabel>
               <Select
                 label="Firm"
                 value={tempFilterFirm}
                 onChange={(e) => setTempFilterFirm(e.target.value)}
                 IconComponent={ArrowDropDownIcon}
                 sx={{
                   borderRadius: '8px',
                   '& .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(0,0,0,0.1)'
                   },
                   '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   },
                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   }
                 }}
               >
                 <MenuItemMUI value="">All Firms</MenuItemMUI>
                 {firmOptions.map((f) => (
                   <MenuItemMUI key={f} value={f}>{f}</MenuItemMUI>
                 ))}
               </Select>
             </FormControl>
           </Box>
           <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
             <FormControl variant="outlined" size="small" fullWidth>
               <InputLabel>Team</InputLabel>
               <Select
                 label="Team"
                 value={tempFilterTeam}
                 onChange={(e) => setTempFilterTeam(e.target.value)}
                 IconComponent={ArrowDropDownIcon}
                 sx={{
                   borderRadius: '8px',
                   '& .MuiOutlinedInput-notchedOutline': {
                     borderColor: 'rgba(0,0,0,0.1)'
                   },
                   '&:hover .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   },
                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                     borderColor: '#E5D3BC'
                   }
                 }}
               >
                 <MenuItemMUI value="">All Teams</MenuItemMUI>
                 {teamOptions.map((t) => (
                   <MenuItemMUI key={t} value={t}>{t}</MenuItemMUI>
                 ))}
               </Select>
             </FormControl>
           </Box>
           </Box>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
           <Button
             variant="outlined"
             onClick={doResetFilters}
             sx={{
               textTransform: 'none',
               color: '#6B7280',
               borderColor: 'rgba(0,0,0,0.1)',
               borderRadius: '8px',
               px: 3,
               py: 1,
               fontWeight: 500,
               '&:hover': { 
                 backgroundColor: 'rgba(0,0,0,0.02)',
                 borderColor: 'rgba(0,0,0,0.2)'
               },
             }}
           >
             Reset Filters
           </Button>
           <Button
             variant="contained"
             onClick={doApplyFilters}
             sx={{
               textTransform: 'none',
               backgroundColor: '#E5D3BC',
               borderRadius: '8px',
               px: 3,
               py: 1,
               fontWeight: 500,
               boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
               '&:hover': { 
                 backgroundColor: '#d6c3ac',
                 boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
               },
             }}
           >
             Apply Filters
           </Button>
           {(filterProvince || filterCity || filterFirm || filterTeam || filterFavorites || filterReports) && (
             <Button
               variant="contained"
               onClick={() => setReportDialogOpen(true)}
               sx={{
                 textTransform: 'none',
                 backgroundColor: '#1D4ED8',
                 borderRadius: '8px',
                 px: 3,
                 py: 1,
                 fontWeight: 500,
                 boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                 '&:hover': { 
                   backgroundColor: '#1E40AF',
                   boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                 },
               }}
             >
               Save as Report
             </Button>
           )}
         </Box>
       </Paper>
     </Fade>

     <Fade in={true} timeout={1000}>
       <Paper sx={{ 
         border: '1px solid rgba(0,0,0,0.05)',
         borderRadius: '16px',
         boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
         background: '#ffffff',
         overflow: 'hidden'
       }}>
         {loading && data.length === 0 ? (
           <Box sx={{ p: 8, textAlign: 'center' }}>
             <Typography color="text.secondary">Loading advisors...</Typography>
           </Box>
         ) : (
           <>
             <TableContainer sx={{ 
               height: 1000, 
               overflowY: 'auto',
               userSelect: 'none',
               WebkitUserSelect: 'none',
               MozUserSelect: 'none',
               msUserSelect: 'none',
               scrollbarWidth: 'thin',
               scrollbarColor: '#E5D3BC #f8fafc',
               '&::-webkit-scrollbar': {
                 width: '8px',
               },
               '&::-webkit-scrollbar-track': {
                 background: '#f8fafc',
               },
               '&::-webkit-scrollbar-thumb': {
                 background: '#E5D3BC',
                 borderRadius: '4px',
               },
               '&::-webkit-scrollbar-thumb:hover': {
                 background: '#d6c3ac',
               }
             }}>
               <Table stickyHeader>
                 <TableHead>
                   <TableRow>
                     {columns.map((col) => {
                       const activeSort = col.key === sortBy;
                       return (
                         <TableCell
                           key={col.key}
                           sx={{ 
                             fontWeight: 600, 
                             cursor: 'pointer', 
                             color: '#1E293B',
                             backgroundColor: '#f8fafc',
                             borderBottom: '2px solid #E5D3BC',
                             py: 2.5,
                             '&:hover': {
                               backgroundColor: '#f1f5f9'
                             }
                           }}
                           onClick={() => handleSort(col.key)}
                         >
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                             {col.label}
                             {activeSort &&
                               (sortDir === 'asc' ? (
                                 <ArrowUpwardIcon fontSize="small" sx={{ color: '#E5D3BC' }} />
                               ) : (
                                 <ArrowDownwardIcon fontSize="small" sx={{ color: '#E5D3BC' }} />
                               ))}
                           </Box>
                         </TableCell>
                       );
                     })}
                     <TableCell sx={{ 
                       fontWeight: 600, 
                       color: '#1E293B', 
                       backgroundColor: '#f8fafc',
                       borderBottom: '2px solid #E5D3BC',
                       py: 2.5,
                       width: '200px'
                     }}>
                       Actions
                     </TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {data.length === 0 ? (
                     <TableRow>
                       <TableCell colSpan={columns.length + 1}>
                         <Box sx={{ p: 8, textAlign: 'center' }}>
                           <Typography color="text.secondary">
                             No advisors found. Try adjusting your filters.
                           </Typography>
                         </Box>
                       </TableCell>
                     </TableRow>
                   ) : (
                     data.map((row, idx) => renderRow(row, idx))
                   )}
                 </TableBody>
               </Table>
             </TableContainer>

             {!loading && !error && data.length > 0 && (
               <Box sx={{ 
                 p: 3, 
                 borderTop: '1px solid rgba(0,0,0,0.05)',
                 backgroundColor: '#f8fafc'
               }}>
                 <Pagination />
                 <Box sx={{ 
                   mt: 2, 
                   textAlign: 'center', 
                   color: '#64748B',
                   fontSize: '0.95rem'
                 }}>
                   Showing {((page - 1) * limit) + 1}-{Math.min(page * limit, total)} of {total} advisors
                 </Box>
                 <Box
                   sx={{
                     mt: 3,
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: 2,
                   }}
                 >
                   <TextField
                     label="Go to Page"
                     variant="outlined"
                     size="small"
                     sx={{ 
                       width: '120px',
                       '& .MuiOutlinedInput-root': {
                         borderRadius: '8px',
                         '& fieldset': {
                           borderColor: 'rgba(0,0,0,0.1)',
                         },
                         '&:hover fieldset': {
                           borderColor: '#E5D3BC',
                         },
                         '&.Mui-focused fieldset': {
                           borderColor: '#E5D3BC',
                         },
                       },
                     }}
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
                       color: '#E5D3BC',
                       borderColor: '#E5D3BC',
                       borderRadius: '8px',
                       textTransform: 'none',
                       px: 3,
                       '&:hover': { 
                         backgroundColor: 'rgba(229,211,188,0.04)', 
                         borderColor: '#E5D3BC' 
                       },
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
     </Fade>

     {/* Enhanced Professional Advisor Details Dialog */}
     {selectedRow && (
       <Dialog 
         open={true} 
         onClose={closeInfoDialog} 
         fullWidth 
         maxWidth="md"
         PaperProps={{
           sx: {
             borderRadius: '16px',
             maxHeight: '90vh'
           }
         }}
       >
         <DialogTitle 
           sx={{ 
             backgroundColor: '#f8fafc', 
             color: '#1E293B', 
             fontWeight: 'bold', 
             p: 3, 
             fontSize: '1.5rem',
             borderBottom: '1px solid rgba(0,0,0,0.05)'
           }}
         >
           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
               <Box sx={{ 
                 backgroundColor: '#E5D3BC',
                 borderRadius: '12px',
                 width: 48,
                 height: 48,
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center'
               }}>
                 <PersonIcon sx={{ color: '#fff', fontSize: 28 }} />
               </Box>
               <Typography variant="h5" sx={{ fontWeight: 700 }}>
                 Advisor Profile
               </Typography>
             </Box>
           </Box>
         </DialogTitle>

         <DialogContent sx={{ 
           p: 0, 
           backgroundColor: '#ffffff',
           userSelect: 'none',
           WebkitUserSelect: 'none',
           MozUserSelect: 'none',
           msUserSelect: 'none'
         }}>
           {/* Header with name and title */}
           <Box sx={{ 
             p: 4, 
             borderBottom: '1px solid rgba(0,0,0,0.05)', 
             backgroundColor: '#f8fafc',
             background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)'
           }}>
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <Box>
                 <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>
                   {selectedRow['First Name']} {selectedRow['Last Name']}
                 </Typography>
                 <Typography variant="h6" sx={{ color: '#6B7280', fontWeight: 400 }}>
                   {selectedRow['Title'] || 'Advisor'} at {selectedRow['Firm']}
                 </Typography>
               </Box>
               <Chip 
                 label={selectedRow['Province']} 
                 sx={{ 
                   backgroundColor: '#E5D3BC',
                   color: '#374151',
                   fontWeight: 600,
                   fontSize: '0.875rem'
                 }} 
               />
             </Box>
           </Box>

           <Box sx={{ p: 4 }}>
             <Grid container spacing={4}>
               {/* Left column - Professional info */}
               <Grid item xs={12} md={6}>
                 <Paper elevation={0} sx={{ 
                   p: 3, 
                   backgroundColor: '#f8fafc', 
                   borderRadius: '12px',
                   border: '1px solid rgba(0,0,0,0.05)',
                   height: '100%'
                 }}>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                     <BusinessIcon sx={{ color: '#E5D3BC' }} />
                     <Typography variant="h6" sx={{ 
                       color: '#111827', 
                       fontWeight: 600,
                     }}>
                       Professional Information
                     </Typography>
                   </Box>
                   
                   <Box sx={{ mb: 3 }}>
                     <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 600, letterSpacing: 1.5 }}>
                       Team Name
                     </Typography>
                     <Typography variant="body1" sx={{ fontWeight: selectedRow['Team Name'] ? 500 : 400, mt: 0.5 }}>
                       {selectedRow['Team Name'] || 'N/A'}
                     </Typography>
                   </Box>
                   
                   <Box sx={{ mb: 3 }}>
                     <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 600, letterSpacing: 1.5 }}>
                       Firm
                     </Typography>
                     <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                       {selectedRow['Firm'] || 'N/A'}
                     </Typography>
                   </Box>
                   
                   <Box sx={{ mb: 3 }}>
                     <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 600, letterSpacing: 1.5 }}>
                       Branch
                     </Typography>
                     <Typography variant="body1" sx={{ mt: 0.5 }}>
                       {selectedRow['Branch'] || 'N/A'}
                     </Typography>
                   </Box>
                   
                   <Box sx={{ mb: 1 }}>
                     <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 600, letterSpacing: 1.5 }}>
                       Title
                     </Typography>
                     <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                       {selectedRow['Title'] || 'N/A'}
                     </Typography>
                   </Box>
                 </Paper>
               </Grid>
               
               {/* Right column - Contact info */}
               <Grid item xs={12} md={6}>
                 <Paper elevation={0} sx={{ 
                   p: 3, 
                   backgroundColor: '#f8fafc', 
                   borderRadius: '12px',
                   border: '1px solid rgba(0,0,0,0.05)',
                   height: '100%'
                 }}>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                     <LocationOnIcon sx={{ color: '#E5D3BC' }} />
                     <Typography variant="h6" sx={{ 
                       color: '#111827', 
                       fontWeight: 600,
                     }}>
                       Contact Information
                     </Typography>
                   </Box>
                   
                   <Box sx={{ mb: 3 }}>
                     <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 600, letterSpacing: 1.5 }}>
                       Address
                     </Typography>
                     <Typography variant="body1" sx={{ mt: 0.5 }}>
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
                     <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 600, letterSpacing: 1.5 }}>
                       Business Phone
                     </Typography>
                     {selectedRow['Business Phone'] ? (
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                         <PhoneIcon sx={{ color: '#E5D3BC', fontSize: 20 }} />
                         <Button 
                           onClick={() => window.open(`tel:${selectedRow['Business Phone']}`, '_blank')}
                           sx={{ 
                             color: '#1E293B', 
                             p: 0, 
                             textTransform: 'none',
                             fontWeight: 500,
                             fontSize: '1rem',
                             '&:hover': { backgroundColor: 'transparent', color: '#1D4ED8' }
                           }}
                         >
                           {selectedRow['Business Phone'].replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                         </Button>
                       </Box>
                     ) : (
                       <Typography variant="body1" sx={{ mt: 0.5 }}>N/A</Typography>
                     )}
                   </Box>
                   
                   <Box sx={{ mb: 1 }}>
                     <Typography variant="overline" sx={{ color: '#6B7280', fontWeight: 600, letterSpacing: 1.5 }}>
                       Email
                     </Typography>
                     {selectedRow['Email'] ? (
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                         <EmailIcon sx={{ color: '#E5D3BC', fontSize: 20 }} />
                         <Button 
                           onClick={() => window.open(`mailto:${selectedRow['Email']}`, '_blank')}
                           sx={{ 
                             color: '#1D4ED8', 
                             p: 0, 
                             textTransform: 'none',
                             fontWeight: 500,
                             '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                           }}
                         >
                           {selectedRow['Email']}
                         </Button>
                       </Box>
                     ) : (
                       <Typography variant="body1" sx={{ mt: 0.5 }}>N/A</Typography>
                     )}
                   </Box>
                 </Paper>
               </Grid>
             </Grid>
             
             {/* Bottom row - Online presence */}
             <Paper elevation={0} sx={{ 
               p: 3, 
               mt: 4, 
               backgroundColor: '#f8fafc', 
               borderRadius: '12px',
               border: '1px solid rgba(0,0,0,0.05)'
             }}>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                 <LanguageIcon sx={{ color: '#E5D3BC' }} />
                 <Typography variant="h6" sx={{ 
                   color: '#111827', 
                   fontWeight: 600,
                 }}>
                   Online Presence
                 </Typography>
               </Box>
               
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
                         backgroundColor: '#E5D3BC',
                         color: '#1E293B',
                         px: 3,
                         py: 1.2,
                         borderRadius: '8px',
                         fontWeight: 600,
                         textTransform: 'none',
                         fontSize: '0.95rem',
                         boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                         '&:hover': {
                           backgroundColor: '#d6c3ac',
                           boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
                         borderRadius: '8px',
                         fontWeight: 600,
                         textTransform: 'none',
                         fontSize: '0.95rem',
                         boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                         '&:hover': {
                           backgroundColor: '#0958A7',
                           boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
           borderTop: '1px solid rgba(0,0,0,0.05)', 
           backgroundColor: '#f8fafc',
           display: 'flex',
           justifyContent: 'space-between'
         }}>
           <Button 
             onClick={() => openFavoriteDialog(selectedRow)}
             startIcon={<FavoriteIcon />}
             variant="outlined"
             sx={{
               color: '#E5D3BC',
               borderColor: '#E5D3BC',
               borderRadius: '8px',
               fontWeight: 500,
               textTransform: 'none',
               px: 3,
               py: 1,
               '&:hover': {
                 backgroundColor: 'rgba(229,211,188,0.04)',
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
               backgroundColor: '#E5D3BC',
               color: '#1E293B',
               borderRadius: '8px',
               fontWeight: 600,
               textTransform: 'none',
               px: 4,
               py: 1,
               boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
               '&:hover': {
                 backgroundColor: '#d6c3ac',
                 boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
               }
             }}
           >
             Close
           </Button>
         </DialogActions>
       </Dialog>
     )}

     {/* Favorites Dialog */}
     <Dialog 
       open={favoriteDialogOpen} 
       onClose={closeFavoriteDialog} 
       fullWidth 
       maxWidth="xs"
       PaperProps={{
         sx: {
           borderRadius: '16px',
         }
       }}
     >
       <DialogTitle sx={{ pb: 2 }}>Add to Favorites</DialogTitle>
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
             sx={{
               borderRadius: '8px',
             }}
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
             sx={{
               '& .MuiOutlinedInput-root': {
                 borderRadius: '8px',
               },
             }}
           />
         )}
       </DialogContent>
       <DialogActions sx={{ p: 2 }}>
       <Button 
           onClick={closeFavoriteDialog} 
           sx={{ 
             borderRadius: '8px',
             textTransform: 'none',
             px: 3
           }}
         >
           Cancel
         </Button>
         <Button 
           onClick={addToFavorites} 
           variant="contained"
           sx={{ 
             backgroundColor: '#E5D3BC',
             color: '#1E293B',
             borderRadius: '8px',
             textTransform: 'none',
             px: 3,
             '&:hover': {
               backgroundColor: '#d6c3ac',
             }
           }}
         >
           Add
         </Button>
       </DialogActions>
     </Dialog>

     {/* Report Dialog */}
     <Dialog
       open={reportDialogOpen}
       onClose={() => setReportDialogOpen(false)}
       PaperProps={{
         sx: {
           borderRadius: '16px',
         }
       }}
     >
       <DialogTitle>Save as Report</DialogTitle>
       <DialogContent>
         <Typography variant="body2" sx={{ mb: 2 }}>
           Enter a name for this report. All currently filtered advisors ({data.length}) will be saved.
         </Typography>
         <TextField
           label="Report Name"
           variant="outlined"
           fullWidth
           value={newReportName}
           onChange={(e) => setNewReportName(e.target.value)}
           sx={{
             '& .MuiOutlinedInput-root': {
               borderRadius: '8px',
             },
           }}
         />
       </DialogContent>
       <DialogActions sx={{ p: 2 }}>
         <Button 
           onClick={() => setReportDialogOpen(false)}
           sx={{ 
             borderRadius: '8px',
             textTransform: 'none',
             px: 3
           }}
         >
           Cancel
         </Button>
         <Button 
           onClick={saveAsReport}
           variant="contained"
           sx={{ 
             backgroundColor: '#E5D3BC',
             color: '#1E293B',
             borderRadius: '8px',
             textTransform: 'none',
             px: 3,
             '&:hover': {
               backgroundColor: '#d6c3ac',
             }
           }}
         >
           Save Report
         </Button>
       </DialogActions>
     </Dialog>

     {/* Snackbar for notifications */}
     <Snackbar
       open={snackbarOpen}
       autoHideDuration={3000}
       onClose={() => setSnackbarOpen(false)}
       anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
     >
       <Alert 
         onClose={() => setSnackbarOpen(false)} 
         severity="success"
         sx={{ 
           width: '100%',
           borderRadius: '8px',
           boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
         }}
       >
         {snackbarMessage}
       </Alert>
     </Snackbar>
   </Box>
 );
});

// Add display name to fix the ESLint error
RecordsSection.displayName = 'RecordsSection';

// Account Menu Component
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
 const handleReports = () => {
   window.location.href = '/reports';
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
         fontWeight: 600,
         textTransform: 'none',
         fontSize: '1rem',
         borderRadius: '8px',
         px: 2,
         py: 1,
         '&:hover': { 
           color: '#1D4ED8',
           backgroundColor: 'rgba(29, 78, 216, 0.04)'
         },
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
       PaperProps={{
         sx: {
           mt: 1,
           borderRadius: '12px',
           boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
           minWidth: '200px',
           border: '1px solid rgba(0,0,0,0.05)'
         }
       }}
     >
       <MenuItem 
         onClick={handleAccountInfo}
         sx={{
           py: 1.5,
           px: 2.5,
           fontSize: '0.95rem',
           '&:hover': {
             backgroundColor: '#f8fafc'
           }
         }}
       >
         Account Info
       </MenuItem>
       <MenuItem 
         onClick={handleChangePassword}
         sx={{
           py: 1.5,
           px: 2.5,
           fontSize: '0.95rem',
           '&:hover': {
             backgroundColor: '#f8fafc'
           }
         }}
       >
         Change Password
       </MenuItem>
       <MenuItem 
         onClick={handleFavorites}
         sx={{
           py: 1.5,
           px: 2.5,
           fontSize: '0.95rem',
           '&:hover': {
             backgroundColor: '#f8fafc'
           }
         }}
       >
         Favorites
       </MenuItem>
       <MenuItem 
         onClick={handleReports}
         sx={{
           py: 1.5,
           px: 2.5,
           fontSize: '0.95rem',
           '&:hover': {
             backgroundColor: '#f8fafc'
           }
         }}
       >
         Report List
       </MenuItem>
       <Divider sx={{ my: 1 }} />
       <MenuItem 
         onClick={handleLogout}
         sx={{
           py: 1.5,
           px: 2.5,
           fontSize: '0.95rem',
           color: '#ef4444',
           '&:hover': {
             backgroundColor: '#fef2f2'
           }
         }}
       >
         Logout
       </MenuItem>
     </Menu>
   </Box>
 );
}
