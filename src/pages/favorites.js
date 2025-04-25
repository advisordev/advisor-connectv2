// src/pages/favorites.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  GlobalStyles,
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Favorites() {
  const router = useRouter();
  const [favoriteLists, setFavoriteLists] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  // Load favorites from localStorage on mount
  useEffect(() => {
    const lists = JSON.parse(localStorage.getItem('favoriteLists')) || {};
    setFavoriteLists(lists);
  }, []);

  const saveFavoriteLists = (lists) => {
    localStorage.setItem('favoriteLists', JSON.stringify(lists));
    setFavoriteLists(lists);
  };

  const handleDeleteList = (listName) => {
    if (confirm(`Are you sure you want to delete the favorites list "${listName}"?`)) {
      const lists = { ...favoriteLists };
      delete lists[listName];
      saveFavoriteLists(lists);
    }
  };

  const handleRemoveRow = (listName, rowIndex) => {
    const lists = { ...favoriteLists };
    lists[listName] = lists[listName].filter((_, idx) => idx !== rowIndex);
    saveFavoriteLists(lists);
  };

  // Top Bar Navigation
  const handleHome = () => {
    router.push('/dashboard');
    setDrawerOpen(false);
  };

  const handleAbout = () => {
    router.push('/about');
    setDrawerOpen(false);
  };

  const handleAccount = () => {
    // This would be updated with your account page navigation
    alert('Account button clicked');
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        backgroundColor: 'white', 
        overflowX: 'hidden' 
      }}
    >
      {/* Global Reset to remove default margins */}
      <GlobalStyles styles={{ 'html, body': { margin: 0, padding: 0 } }} />

      {/* Top Bar (color #E5D3BC) */}
      <Box
        sx={{
          backgroundColor: '#E5D3BC',
          width: '100%',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #e5e7eb',
          justifyContent: 'space-between',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Left-aligned title - with max width to prevent pushing buttons */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Image
            src="/logo.png" 
            alt="Advisor Connect"
            width={150}         
            height={56}         
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

        {/* Right-aligned navigation - moved left by reducing margin */}
        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="end"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              mr: 5 // Add right margin to shift buttons left from edge
            }}
          >
            <Button
              onClick={handleHome}
              sx={{
                color: '#374151',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                ':hover': { color: '#1D4ED8' },
                padding: '6px 8px'
              }}
            >
              Home
            </Button>
            <Button
              onClick={handleAbout}
              sx={{
                color: '#374151',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                ':hover': { color: '#1D4ED8' },
                padding: '6px 8px'
              }}
            >
              About
            </Button>
            <Button
              onClick={handleAccount}
              sx={{
                color: '#374151',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                ':hover': { color: '#2563EB' },
                padding: '6px 8px'
              }}
            >
              Account
            </Button>
          </Box>
        )}

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button onClick={handleHome}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={handleAbout}>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button onClick={handleAccount}>
                <ListItemText primary="Account" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>

      {/* Favorites Content */}
      <Container maxWidth="lg" sx={{ mt: 4, px: { xs: 2, sm: 3 } }}>
        {Object.keys(favoriteLists).length === 0 ? (
          <Paper sx={{ p: 3 }}>
            <Typography>No favorites lists created yet.</Typography>
          </Paper>
        ) : (
          Object.entries(favoriteLists).map(([listName, rows]) => (
            <Paper key={listName} sx={{ p: 3, mb: 4 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1E293B' }}>
                  {listName}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteList(listName)}
                  sx={{ textTransform: 'none', color: 'red' }}
                >
                  Delete List
                </Button>
              </Box>
              {rows.length === 0 ? (
                <Typography>No rows in this list.</Typography>
              ) : (
                <TableContainer sx={{ overflowX: 'auto' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#E5D3BC' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#111827' }}>
                          First Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#111827' }}>
                          Last Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#111827' }}>
                          City
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#111827' }}>
                          Province
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#111827' }}>
                          Firm
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#111827' }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, idx) => (
                        <TableRow key={idx} hover>
                          <TableCell>{row['First Name'] ?? ''}</TableCell>
                          <TableCell>{row['Last Name'] ?? ''}</TableCell>
                          <TableCell>{row['City'] ?? ''}</TableCell>
                          <TableCell>{row['Province'] ?? ''}</TableCell>
                          <TableCell>{row['Firm'] ?? ''}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={() => handleRemoveRow(listName, idx)}
                              sx={{ 
                                textTransform: 'none', 
                                color: 'red', 
                                fontSize: '0.8rem' 
                              }}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          ))
        )}
      </Container>
    </Box>
  );
}