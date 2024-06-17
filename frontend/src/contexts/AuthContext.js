import React, { createContext, useState, useEffect } from 'react';
import { login, logout, getProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const profile = await getProfile();
        setUser(profile);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (email, password, navigate) => {
    const data = await login(email, password);
    setUser(data.user);
    navigate('/users');
  };

  const handleLogout = (navigate) => {
    logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
