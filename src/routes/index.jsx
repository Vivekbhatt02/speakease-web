import {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {AuthContext} from '../context/AuthContext.jsx';
import {LoginPage} from '../components/auth/LoginPage.jsx';
import {RegisterPage} from '../components/auth/RegisterPage.jsx';
import {ProtectedRoute} from '../components/ProtectedRoute.jsx';
import {AdminDashboard} from '../components/AdminDashboard.jsx';
import {SpeakPage} from '../components/speak/SpeakPage.jsx';
import {SavedPhrasesPage} from '../components/phrases/SavedPhrasesPage.jsx';
import {Box, CircularProgress} from '@mui/material';
import {PATHS} from '../constants/navigationConstants.js';

const styles = {
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
};

function AppRoutes() {
    const {currentUser, loading} = useContext(AuthContext);

    if (loading) {
        return (
          <Box sx={styles.loadingContainer}>
              <CircularProgress/>
          </Box>
        );
    }

    return (
      <Routes>
          <Route path={PATHS.LOGIN} element={currentUser ? <Navigate to={PATHS.SPEAK} replace /> : <LoginPage />} />
          <Route path={PATHS.REGISTER} element={currentUser ? <Navigate to={PATHS.SPEAK} replace /> : <RegisterPage />} />
          <Route path={PATHS.SPEAK} element={<ProtectedRoute><SpeakPage /></ProtectedRoute>} />
          <Route path={PATHS.PHRASES} element={<ProtectedRoute><SavedPhrasesPage /></ProtectedRoute>} />
          <Route path={PATHS.ADMIN} element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to={currentUser ? PATHS.SPEAK : PATHS.LOGIN} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
}

export default AppRoutes;
