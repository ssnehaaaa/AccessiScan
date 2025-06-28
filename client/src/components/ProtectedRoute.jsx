import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/authAtom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const checkAuth = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuth({
          isLoggedIn: true,
          user: res.data.user,
          token,
        });

        setIsAuthenticated(true);
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [setAuth]);

  if (isAuthenticated === null) return <p className="p-4">Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
