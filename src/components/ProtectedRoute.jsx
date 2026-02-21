import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import {Box, CircularProgress, Typography} from '@mui/material';

const styles = {
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    deniedContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '1rem',
        textAlign: 'center',
    },
};

export const ProtectedRoute = ({children, requiredRole = null}) => {
    const {currentUser, userRole, loading} = useContext(AuthContext);

    if (loading) {
        return (
          <Box sx={styles.loadingContainer}>
              <CircularProgress/>
          </Box>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace/>;
    }

    if (requiredRole && userRole !== requiredRole) {
        return (
          <Box sx={styles.deniedContainer}>
              <Typography variant="h5">Access Denied</Typography>
              <Typography variant="body2" color="text.secondary">
                  You don't have permission to access this page.
              </Typography>
          </Box>
        );
    }

    return children;
};
