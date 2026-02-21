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
          <Route path="/login" element={currentUser ? <Navigate to="/speak" replace /> : <LoginPage />} />
          <Route path="/register" element={currentUser ? <Navigate to="/speak" replace /> : <RegisterPage />} />
          <Route path="/speak" element={<ProtectedRoute><SpeakPage /></ProtectedRoute>} />
          <Route path="/phrases" element={<ProtectedRoute><SavedPhrasesPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to={currentUser ? "/speak" : "/login"} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
}

export default AppRoutes;
