import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {registerUser} from '../../services/firebase.js';
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
    subtitle: {
        color: 'text.secondary',
        fontSize: '0.9rem',
    },
    input: {
        width: '100%',
    },
    button: {
        py: '0.75rem',
        fontSize: '1rem',
    },
};

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            setError('');
            setLoading(true);

            if (!email.trim() || !password.trim()) {
                setError('Please enter email and password');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            if (password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }

            await registerUser(email, password);
            navigate('/speak');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !loading) {
            handleRegister();
        }
    };

    return (
      <PageContainer>
          <Box sx={styles.container}>
              <Typography variant="h4" sx={styles.title}>
                  Register
              </Typography>
              <Typography sx={styles.subtitle}>
                  Create an account to get started
              </Typography>

              {error && <Alert severity="error">{error}</Alert>}

              <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} sx={styles.input} disabled={loading} aria-label="Email input" />
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} sx={styles.input} disabled={loading} aria-label="Password input" helperText="At least 6 characters" />
              <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={handleKeyDown} sx={styles.input} disabled={loading} aria-label="Confirm password input" />
              <Button variant="contained" onClick={handleRegister} disabled={loading || !email || !password || !confirmPassword} sx={styles.button}>
                  {loading ? <CircularProgress size="1.5rem" color="inherit" /> : 'Register'}
              </Button>
              <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#1565C0', textDecoration: 'none' }}>
                    Login here
                  </Link>
              </Typography>
          </Box>
      </PageContainer>
    );
};
