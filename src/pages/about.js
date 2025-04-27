// src/pages/about.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  GlobalStyles, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Menu,
  MenuItem,
  Divider,
  Fade
} from '@mui/material';
import Image from 'next/image';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function About() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/dashboard');
  };

  // Enhanced copy protection
  React.useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    
    const handleKeyDown = (e) => {
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
          px: '50px',
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
          sx={{
            color: '#1D4ED8',
            backgroundColor: 'rgba(29, 78, 216, 0.04)',
            fontWeight: 600,
            mr: 3,
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: '8px',
            px: 2,
            py: 1,
          }}
        >
          About
        </Button>
        <AccountMenu />
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        mt: 4, 
        px: '50px',
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
                About Advisor Connect
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
                  maxWidth: '800px'
                }}
              >
                Your comprehensive platform for connecting with wealth advisors across Canada
              </Typography>
            </Box>
          </Paper>
        </Fade>

        {/* Overview Section */}
        <Fade in={true} timeout={1000}>
          <Paper sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            background: '#ffffff'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <InfoIcon sx={{ color: '#E5D3BC', fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
                Overview
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: '#374151' }}>
              Advisor Connect is a revolutionary, all-in-one platform that transforms how professionals
              identify and connect with Wealth Advisors across Canada&apos;s Private Wealth Management industry.
              This unique database delivers unparalleled access to over 14,000 meticulously curated contacts
              from 27 leading firms—both bank-owned and independent firms.
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: '#374151' }}>
              Built by a seasoned industry veteran, Advisor Connect was designed with a deep understanding
              of the power of a robust CRM. More than just a contact list, it provides accurate, streamlined
              access to key decision-makers—all within a single, powerful platform. The result? Enhanced
              opportunity identification, stronger business relationships, and seamless client servicing.
            </Typography>
            
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#374151' }}>
              Covering over 95% of the Canadian Private Wealth market, Advisor Connect is the most comprehensive
              and accurate database resource available in Canada. Whether you&apos;re building strategic partnerships,
              expanding your client base, optimizing social media campaigns, or conducting in-depth market research,
              Advisor Connect delivers the data, time savings, and competitive edge you need to succeed.
            </Typography>
          </Paper>
        </Fade>

        {/* Key Benefits Section */}
        <Fade in={true} timeout={1200}>
          <Paper sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            background: '#ffffff'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <CheckCircleIcon sx={{ color: '#E5D3BC', fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
                Key Benefits of Advisor Connect
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
              gap: 3 
            }}>
              {[
                "Centralized Access: 14,000+ contacts across 27 leading Canadian Private Wealth firms.",
                "Verified, Targeted Contacts: Reach key decision-makers with precise titles.",
                "Strategic Team Navigation: Efficient targeting via clear team names.",
                "In-Depth Team Research: Direct links to team websites.",
                "LinkedIn Integration: Direct access to 85%+ of Advisor LinkedIn profiles.",
                "Customizable Favorite Lists: Create and save favorite contact lists.",
                "Dynamic, Auto-Updating Reports: Generate and save reports.",
                "Consistent Accuracy & Time Savings: Regularly updated database with annual firm reviews.",
                "Reliable Email Addresses: All emails validated by a trusted third-party."
              ].map((benefit, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 2,
                    p: 2,
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  <CheckCircleIcon sx={{ color: '#E5D3BC', mt: 0.5, flexShrink: 0 }} />
                  <Typography sx={{ color: '#374151', lineHeight: 1.6 }}>
                    {benefit}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Fade>

        {/* Sources Section */}
        <Fade in={true} timeout={1400}>
          <Paper sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            background: '#ffffff'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <VerifiedIcon sx={{ color: '#E5D3BC', fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
                Advisor Contact Sources
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mb: 3, color: '#374151' }}>
              Database built from rigorously verified sources:
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Paper elevation={0} sx={{ 
                p: 3, 
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827', mb: 2 }}>
                  Official Websites
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#374151' }}>
                  <li>Company Corporate Websites</li>
                  <li>Advisor Websites</li>
                </ul>
              </Paper>
              
              <Paper elevation={0} sx={{ 
                p: 3, 
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827', mb: 2 }}>
                  Professional Networking
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#374151' }}>
                  <li>LinkedIn Corporate Profiles</li>
                  <li>LinkedIn Advisor Profiles</li>
                </ul>
              </Paper>
              
              <Paper elevation={0} sx={{ 
                p: 3, 
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827', mb: 2 }}>
                  Regulatory Bodies & Associations
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#374151' }}>
                  <li>CIRO</li>
                  <li>CSA</li>
                  <li>CAASA</li>
                  <li>PMAC</li>
                </ul>
              </Paper>
              
              <Paper elevation={0} sx={{ 
                p: 3, 
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827', mb: 2 }}>
                  Industry Publications & News
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#374151' }}>
                  <li>Advisor.ca</li>
                  <li>Investment Executive</li>
                  <li>Canadian Family Offices</li>
                  <li>Investissement & Finance</li>
                  <li>Various Newspaper Feeds</li>
                </ul>
              </Paper>
            </Box>
          </Paper>
        </Fade>

        {/* Firms Section */}
        <Fade in={true} timeout={1600}>
          <Paper sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            background: '#ffffff'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <BusinessIcon sx={{ color: '#E5D3BC', fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
                Firms Included in Advisor Connect
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, 
              gap: 2 
            }}>
              {[
                "Acumen Capital Partners",
                "Aligned Capital Partners",
                "Assante Wealth Management",
                "Bellwether Investment Management",
                "BMO Nesbitt Burns",
                "CG Wealth Management",
                "CIBC Wood Gundy",
                "Desjardins Securities",
                "Edward Jones",
                "Harbour Front Wealth Management",
                "Hayward Capital Markets",
                "IA Private Wealth",
                "IG Securities",
                "IG Private Wealth",
                "Leede Financial",
                "Mandeville Private Client",
                "Manulife Wealth",
                "National Bank Financial",
                "Odlum Brown",
                "Q Wealth",
                "Raymond James Wealth Management",
                "RBC Dominion Securities",
                "Research Capital Corporate",
                "Richardson Wealth",
                "ScotiaMcLeod",
                "TD",
                "Ventum Financial",
                "Wellington-Altus Financial"
              ].map((firm, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    p: 1.5,
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    color: '#374151',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: '#E5D3BC',
                      color: '#1E293B',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {firm}
                </Box>
              ))}
            </Box>
          </Paper>
        </Fade>

        {/* Footer */}
        <Box
          sx={{
            textAlign: 'center',
            color: '#6B7280',
            fontSize: '0.875rem',
            py: 4,
            mt: 8,
            borderTop: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          Advisor Connect | Confidential
        </Box>
      </Box>
    </Box>
  );
}

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