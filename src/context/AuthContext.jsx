import {createContext, useState, useEffect} from 'react';
import {onAuthChange, logoutUser, getUserRole} from '../services/firebase.js';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthChange(async (user) => {
            if (user) {
                setCurrentUser(user);
                try {
                    const role = await getUserRole(user.uid);
                    setUserRole(role);
                } catch (err) {
                    console.error('Error loading user role:', err);
                    setUserRole('user');
                }
            } else {
                setCurrentUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        try {
            setError(null);
            await logoutUser();
            setCurrentUser(null);
            setUserRole(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const value = {
        currentUser,
        userRole,
        loading,
        error,
        logout,
    };

    return (
      <AuthContext.Provider value={value}>
          {children}
      </AuthContext.Provider>
    );
};
