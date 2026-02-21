import {useState, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Avatar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {AuthContext} from '../context/AuthContext.jsx';
import {PATHS} from '../constants/navigationConstants.js';

const styles = {
    appBar: {
        bgcolor: 'primary.main',
    },
    drawerPaper: {
        width: 240,
    },
    drawerBox: {
        width: 240,
    },
    profileBox: {
        p: '1rem',
        textAlign: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        margin: '0 auto',
        bgcolor: 'primary.main',
        fontSize: '1.5rem',
        fontWeight: 600,
    },
    username: {
        color: 'text.secondary',
        mt: '0.5rem',
    },
    divider: {
        my: '1rem',
    },
    listItem: {
        mb: '0.5rem',
    },
    spacer: {
        flex: 1,
    },
    menuButton: {
        mr: '1rem',
    },
};

const navigationItems = [
    {label: 'Speak', path: PATHS.SPEAK, icon: <VolumeUpIcon/>},
    {label: 'Phrases', path: PATHS.PHRASES, icon: <BookmarksIcon/>},
];

export const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {currentUser, userRole, logout} = useContext(AuthContext);

    const currentPath = location.pathname;
    const authPaths = [PATHS.LOGIN, PATHS.REGISTER];
    const isAuthPage = authPaths.includes(currentPath);

    if (!currentUser || isAuthPage) {
        return null; 
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate(PATHS.LOGIN);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
        setDrawerOpen(false);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerContent = (
      <Box sx={styles.drawerBox}>
          <Box sx={styles.profileBox}>
              <Avatar sx={styles.avatar}>{currentUser?.email?.[0].toUpperCase()}</Avatar>
              <Typography variant="body2" sx={styles.username}>
                  {currentUser?.email?.split('@')[0]}
              </Typography>
          </Box>

          <Divider sx={styles.divider}/>

          <List>
              {navigationItems.map((item) => (
                <ListItem key={item.path} disablePadding sx={styles.listItem}>
                    <ListItemButton
                      selected={currentPath === item.path}
                      onClick={() => handleNavigate(item.path)}
                      aria-label={item.label}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label}/>
                    </ListItemButton>
                </ListItem>
              ))}
          </List>

          <Divider/>

          <List>
            {
                userRole === 'admin'
                &&

                 <ListItem disablePadding sx={styles.listItem}>
                    <ListItemButton
                      selected={currentPath === PATHS.ADMIN}
                      onClick={() => handleNavigate(PATHS.ADMIN)}
                      aria-label="Admin panel">
                        <ListItemIcon><AdminPanelSettingsIcon/></ListItemIcon>
                        <ListItemText primary="Admin"/>
                    </ListItemButton>
                </ListItem>
            }
          </List>
      </Box>
    );

    return (
      <Box>
          <AppBar position="fixed" sx={styles.appBar}>
              <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="Open menu"
                    edge="start"
                    onClick={toggleDrawer}
                    sx={styles.menuButton}>
                      <MenuIcon/>
                  </IconButton>
                  <Box sx={styles.spacer}/>
                  <IconButton
                    color="inherit"
                    onClick={handleLogout}
                    aria-label="Logout"
                    edge="end">
                      <LogoutIcon/>
                  </IconButton>
              </Toolbar>
          </AppBar>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            slotProps={{paper: {sx: styles.drawerPaper}}}>
              {drawerContent}
          </Drawer>
      </Box>
    );
};
