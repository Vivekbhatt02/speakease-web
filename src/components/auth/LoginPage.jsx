import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {loginUser} from '../../services/firebase.js';
import {Box, TextField, Button, Typography, Alert, CircularProgress} from '@mui/material';
import {PageContainer} from '../PageContainer';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '20rem',
        mx: 'auto',
        py: '2rem',
    },
    title: {
        mb: '0.5rem',
        fontWeight: 700,
    },
    input: {
        width: '100%',
    },
    button: {
        py: '0.75rem',
        fontSize: '1rem',
    },
};

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setError('');
            setLoading(true);

            if (!email.trim() || !password.trim()) {
                setError('Please enter email and password');
                return;
            }

            await loginUser(email, password);
            navigate('/speak');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !loading) {
            handleLogin();
        }
    };

    return (
      <PageContainer>
          <Box sx={styles.container}>
              <Typography variant="h4" sx={styles.title}>
                  Login
              </Typography>

              {error && <Alert severity="error">{error}</Alert>}

              <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} sx={styles.input} disabled={loading} aria-label="Email input" />
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} sx={styles.input} disabled={loading} aria-label="Password input" />
              <Button variant="contained" onClick={handleLogin} disabled={loading || !email || !password} sx={styles.button}>
                  {loading ? <CircularProgress size="1.5rem" color="inherit" /> : 'Login'}
              </Button>
              <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: '#1565C0', textDecoration: 'none' }}>
                    Register here
                  </Link>
              </Typography>
          </Box>
      </PageContainer>
    );
};
