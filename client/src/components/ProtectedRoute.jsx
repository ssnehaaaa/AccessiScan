import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/authAtom';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(true); // Proper loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    // 💡 First, restore auth from localStorage if missing in Recoil
    if (!auth.isLoggedIn && token && storedUser) {
      setAuth({
        isLoggedIn: true,
        user: JSON.parse(storedUser),
        token,
      });
      setLoading(false);
      return;
    }

    // 🔐 Second, validate token with backend if logged in
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuth({
          isLoggedIn: true,
          user: res.data.user,
          token,
        });

        setLoading(false);
      } catch (err) {
        console.error('Auth check failed:', err);
        setAuth({ user: null, token: null, isLoggedIn: false });
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return auth.isLoggedIn ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
