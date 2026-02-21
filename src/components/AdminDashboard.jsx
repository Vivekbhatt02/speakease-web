import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import {db, setUserRole} from '../services/firebase.js';
import {collection, getDocs} from 'firebase/firestore';
import {Box, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {PageContainer} from './PageContainer';

const styles = {
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'},
        gap: '1.5rem',
        mb: '2rem',
    },
    statCard: {
        textAlign: 'center',
    },
    title: {
        mb: '2rem',
        fontWeight: 700,
    },
    statValue: {
        fontSize: '2rem',
        fontWeight: 700,
        color: 'primary.main',
    },
    statLabel: {
        color: 'text.secondary',
        mt: '0.5rem',
    },
    infoCard: {
        mb: '2rem',
    },
    infoTitle: {
        mb: '1rem',
    },
    infoText: {
        mt: '0.5rem',
    },
    userManagementBox: {
        mb: '2rem',
    },
    userManagementTitle: {
        mb: '1rem',
        fontWeight: 600,
    },
    tableHeaderRow: {
        backgroundColor: 'action.hover',
    },
    tableEmailCell: {
        minWidth: '200px',
    },
    getRoleStyle: (role) => ({
        color: role === 'admin' ? 'success.main' : 'text.secondary',
        fontWeight: role === 'admin' ? 600 : 400,
    }),
};

export const AdminDashboard = () => {
    const {currentUser} = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPhrases: 0,
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const usersSnap = await getDocs(collection(db, 'users'));
                const userCount = usersSnap.size;
                const usersList = [];
                usersSnap.forEach((doc) => {
                    usersList.push({
                        id: doc.id,
                        email: doc.data().email,
                        role: doc.data().role || 'user',
                        createdAt: doc.data().createdAt,
                    });
                });
                setUsers(usersList);

                const phrasesSnap = await getDocs(collection(db, 'phrases'));
                const phraseCount = phrasesSnap.size;

                setStats({
                    totalUsers: userCount,
                    totalPhrases: phraseCount,
                });
            } catch (error) {
                console.error('Error loading admin stats:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleMakeAdmin = async (userId) => {
        try {
            await setUserRole(userId, 'admin');
            setUsers(users.map(u => u.id === userId ? {...u, role: 'admin'} : u));
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const handleMakeUser = async (userId) => {
        try {
            await setUserRole(userId, 'user');
            setUsers(users.map(u => u.id === userId ? {...u, role: 'user'} : u));
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    return (
      <PageContainer>
          <Typography variant="h4" sx={styles.title}>
              Admin Dashboard
          </Typography>

          {loading ? (
            <Typography>Loading analytics...</Typography>
          ) : (
            <>
              <Box sx={styles.statsGrid}>
                  <Card sx={styles.statCard}>
                      <CardContent>
                          <Box sx={styles.statValue}>
                              {stats.totalUsers}
                          </Box>
                          <Typography sx={styles.statLabel}>
                              Total Users
                          </Typography>
                      </CardContent>
                  </Card>

                  <Card sx={styles.statCard}>
                      <CardContent>
                          <Box sx={styles.statValue}>
                              {stats.totalPhrases}
                          </Box>
                          <Typography sx={styles.statLabel}>
                              Total Phrases
                          </Typography>
                      </CardContent>
                  </Card>
              </Box>

              <Card sx={styles.infoCard}>
                  <CardContent>
                      <Typography variant="h6" sx={styles.infoTitle}>
                          System Info
                      </Typography>
                      <Typography variant="body2">
                          User mail: {currentUser?.email}
                      </Typography>
                      <Typography variant="body2" sx={styles.infoText}>
                          Registered Since:{' '}
                          {currentUser?.metadata?.creationTime
                              ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                              : 'N/A'}
                      </Typography>
                  </CardContent>
              </Card>

              <Box sx={styles.userManagementBox}>
                  <Typography variant="h6" sx={styles.userManagementTitle}>
                      User Management
                  </Typography>
                  <TableContainer component={Paper}>
                      <Table>
                          <TableHead>
                              <TableRow sx={styles.tableHeaderRow}>
                                  <TableCell>Email</TableCell>
                                  <TableCell>Role</TableCell>
                                  <TableCell align="right">Actions</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell sx={styles.tableEmailCell}>{user.email}</TableCell>
                                    <TableCell>
                                        <Typography
                                          variant="body2"
                                          sx={styles.getRoleStyle(user.role)}
                                        >
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.role === 'user' ? (
                                          <Button
                                            size="small"
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleMakeAdmin(user.id)}
                                          >
                                              Make Admin
                                          </Button>
                                        ) : (
                                          <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => handleMakeUser(user.id)}
                                          >
                                              Make User
                                          </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </Box>
            </>
          )}
      </PageContainer>
    );
};
