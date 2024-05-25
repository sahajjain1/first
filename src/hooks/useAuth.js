///as in general the login process works like once usernam and pw is send to backend they provde us token but here i have hardcode to my mail and pw
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      if (window.location.pathname === '/login') {
        navigate('/users');
      }
    }
  }, [navigate]);
  

  const login = useCallback((username, password) => {
    // Hardcoded authentication
    if (username === 'sahajjain78@gmail.com' && password === 'Test@1234') {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      setIsAuthenticated(true);
    } else {
      console.error('Invalid credentials');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate]);

  return { login, logout, isAuthenticated, authToken };
};