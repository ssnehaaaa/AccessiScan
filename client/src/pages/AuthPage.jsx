import React from 'react';
import { useLocation } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthPage = () => {
  const location = useLocation();
  const isSignIn = location.pathname === '/signin';

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#f0f4f8] via-[#e7f5f0] to-[#fefefe]">
      {/* Top Navbar */}
      <Navbar />

      {/* Centered AuthCard */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <AuthCard isSignIn={isSignIn} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AuthPage;
