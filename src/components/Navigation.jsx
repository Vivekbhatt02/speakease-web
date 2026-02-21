import {useState, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Avatar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {AuthContext} from '../context/AuthContext.jsx';

const styles = {
    appBar: {
        bgcolor: 'primary.main',
    },
    drawerPaper: {
        width: 240,
    },
    listItem: {
        mb: '0.5rem',
    },
};

const navigationItems = [
    {label: 'Speak', path: '/speak', icon: <VolumeUpIcon/>},
    {label: 'Phrases', path: '/phrases', icon: <BookmarksIcon/>},
];

export const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {currentUser, userRole, logout} = useContext(AuthContext);

    const currentPath = location.pathname;
    const authPaths = ['/login', '/register'];
    const isAuthPage = authPaths.includes(currentPath);

    if (!currentUser || isAuthPage) {
        return null;
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
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
      <Box sx={{width: 240}}>
          <Box sx={{p: '1rem', textAlign: 'center'}}>
              <Avatar
                sx={{
                    width: 60,
                    height: 60,
                    margin: '0 auto',
                    bgcolor: 'blue',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                }}
              >
                  {currentUser?.email?.[0].toUpperCase()}
              </Avatar>
              <Typography variant="body2" sx={{color: 'text.secondary', mt: '0.5rem'}}>
                  {currentUser?.email?.split('@')[0]}
              </Typography>
          </Box>

          <Divider sx={{my: '1rem'}}/>

          <List>
              {navigationItems.map((item) => (
                <ListItem key={item.path} disablePadding sx={styles.listItem}>
                    <ListItemButton
                      selected={currentPath === item.path}
                      onClick={() => handleNavigate(item.path)}
                      aria-label={item.label}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label}/>
                    </ListItemButton>
                </ListItem>
              ))}
          </List>

          <Divider/>

          <List>
              {userRole === 'admin' && (
                <ListItem disablePadding sx={styles.listItem}>
                    <ListItemButton
                      selected={currentPath === '/admin'}
                      onClick={() => handleNavigate('/admin')}
                      aria-label="Admin panel">
                        <ListItemIcon><AdminPanelSettingsIcon/></ListItemIcon>
                        <ListItemText primary="Admin"/>
                    </ListItemButton>
                </ListItem>
              )}
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
                    sx={{mr: '1rem'}}>
                      <MenuIcon/>
                  </IconButton>
                  <Box sx={{flex: 1}}/>
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
