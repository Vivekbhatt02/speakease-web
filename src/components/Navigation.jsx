import {useLocation, useNavigate} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const styles = {
    navigation: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
    },
};

const navigationItems = [
    {label: 'Speak', path: '/', icon: <VolumeUpIcon/>},
    {label: 'Phrases', path: '/saved', icon: <BookmarksIcon/>},
];

export const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentPath = location.pathname;

    return (
      <BottomNavigation
        value={currentPath}
        onChange={(event, newValue) => {
            navigate(newValue);
        }}
        sx={styles.navigation}
      >
          {navigationItems.map((item) => (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              value={item.path}
              icon={item.icon}
            />
          ))}
      </BottomNavigation>
    );
};
