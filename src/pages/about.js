// src/pages/about.js

import React from 'react';
import { useRouter } from 'next/router';
import { GlobalStyles, Box, Typography, Button, Paper, Container } from '@mui/material';
import Image from 'next/image';
// Removed the unused icon imports

////////////////////////////////////////////////////////////////////////////////
// Account Menu Subcomponent (inline for About page)
////////////////////////////////////////////////////////////////////////////////
function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    alert('Favorites clicked');
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
          ':hover': { color: '#2563EB' }
        }}
      >
        Account
      </Button>

      {/* Simple dropdown for "Account" */}
      <Box
        component="div"
        sx={{
          position: 'absolute',
          right: 0,
          mt: 1,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 2,
          display: menuOpen ? 'block' : 'none',
          minWidth: '150px',
          zIndex: 9999
        }}
      >
        <Button
          sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none' }}
          onClick={handleAccountInfo}
        >
          Account Info
        </Button>
        <Button
          sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none' }}
          onClick={handleChangePassword}
        >
          Change Password
        </Button>
        <Button
          sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none' }}
          onClick={handleFavorites}
        >
          Favorites
        </Button>
        <Button
          sx={{ width: '100%', justifyContent: 'flex-start', textTransform: 'none' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

////////////////////////////////////////////////////////////////////////////////
// About Page
////////////////////////////////////////////////////////////////////////////////
export default function About() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/dashboard');
  };
  const handleAbout = () => {
    router.push('/about'); // remains on same route, for consistency
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Global reset to ensure no page-level margin/padding */}
      <GlobalStyles styles={{ 'html, body': { margin: 0, padding: 0 } }} />

      {/* TOP BAR (fills entire width, color #E5D3BC) */}
      <Box
        sx={{
          backgroundColor: '#E5D3BC',
          width: '100%',
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          borderBottom: '1px solid #e5e7eb',
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
            fontSize: '1.1rem',
            textTransform: 'none',
            ':hover': { color: '#1D4ED8' }
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
            ':hover': { color: '#1D4ED8' }
          }}
        >
          About
        </Button>
        <AccountMenu />
      </Box>

      {/* Main About content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#000', mb: 2 }}>
            About
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6, color: '#374151' }}>
            Advisor Connect is a revolutionary, all-in-one platform that transforms how professionals
            identify and connect with Wealth Advisors across Canada&apos;s Private Wealth Management industry.
            This unique database delivers unparalleled access to over 14,000 meticulously curated contacts
            from 27 leading firms—both bank-owned and independent firms.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6, color: '#374151' }}>
            Built by a seasoned industry veteran, Advisor Connect was designed with a deep understanding
            of the power of a robust CRM. More than just a contact list, it provides accurate, streamlined
            access to key decision-makers—all within a single, powerful platform. The result? Enhanced
            opportunity identification, stronger business relationships, and seamless client servicing.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6, color: '#374151' }}>
            Covering over 95% of the Canadian Private Wealth market, Advisor Connect is the most comprehensive
            and accurate database resource available in Canada. Whether you&apos;re building strategic partnerships,
            expanding your client base, optimizing social media campaigns, or conducting in-depth market research,
            Advisor Connect delivers the data, time savings, and competitive edge you need to succeed.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: '600', color: '#000', mt: 3, mb: 2 }}>
            Key Benefits of Advisor Connect:
          </Typography>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Centralized Access: 14,000+ contacts across 27 leading Canadian Private Wealth firms.</li>
            <li>Verified, Targeted Contacts: Reach key decision-makers with precise titles.</li>
            <li>Strategic Team Navigation: Efficient targeting via clear team names.</li>
            <li>In-Depth Team Research: Direct links to team websites.</li>
            <li>LinkedIn Integration: Direct access to 85%+ of Advisor LinkedIn profiles.</li>
            <li>Customizable Favorite Lists: Create and save favorite contact lists.</li>
            <li>Dynamic, Auto-Updating Reports: Generate and save reports.</li>
            <li>Consistent Accuracy &amp; Time Savings: Regularly updated database with annual firm reviews.</li>
            <li>Reliable Email Addresses: All emails validated by a trusted third-party.</li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: '600', color: '#000', mt: 3, mb: 2 }}>
            Advisor Contact Sources:
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.6, color: '#374151' }}>
            Database built from rigorously verified sources:
          </Typography>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>
              <strong>Official Websites:</strong> Company Corporate Websites, Advisor Websites
            </li>
            <li>
              <strong>Professional Networking:</strong> LinkedIn Corporate and Advisor Profiles
            </li>
            <li>
              <strong>Regulatory Bodies &amp; Industry Associations:</strong> CIRO, CSA, CAASA, PMAC
            </li>
            <li>
              <strong>Industry Publications &amp; News:</strong> Advisor.ca, Investment Executive,
              Canadian Family Offices, Investissement &amp; Finance, Various Newspaper Feeds
            </li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: '600', color: '#000', mt: 3, mb: 2 }}>
            Firms included in Advisor Contact:
          </Typography>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Acumen Capital Partners</li>
            <li>Aligned Capital Partners</li>
            <li>Assante Wealth Management</li>
            <li>Bellwether Investment Management</li>
            <li>BMO Nesbitt Burns</li>
            <li>CG Wealth Management</li>
            <li>CIBC Wood Gundy</li>
            <li>Desjardins Securities</li>
            <li>Edward Jones</li>
            <li>Harbour Front Wealth Management</li>
            <li>Hayward Capital Markets</li>
            <li>IA Private Wealth</li>
            <li>IG Securities</li>
            <li>IG Private Wealth</li>
            <li>Leede Financial</li>
            <li>Mandeville Private Client</li>
            <li>Manulife Wealth</li>
            <li>National Bank Financial</li>
            <li>Odlum Brown</li>
            <li>Q Wealth</li>
            <li>Raymond James Wealth Management</li>
            <li>RBC Dominion Securities</li>
            <li>Research Capital Corporate</li>
            <li>Richardson Wealth</li>
            <li>ScotiaMcLeod</li>
            <li>TD</li>
            <li>Ventum Financial</li>
            <li>Wellington-Altus Financial</li>
          </ul>
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          textAlign: 'center',
          color: 'gray',
          fontSize: '0.875rem',
          py: 2,
          mt: 4,
          borderTop: '1px solid #e5e7eb',
          width: '100%',
        }}
      >
        Advisor Connect | Confidential
      </Box>
    </Box>
  );
}