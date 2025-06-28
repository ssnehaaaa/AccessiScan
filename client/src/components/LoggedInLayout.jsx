import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './AnalyzeNavbar';
import Footer from './Footer';

const LoggedInLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-gradient-to-br from-[#fefefe] via-[#f7f7fc] to-[#f0f4f8]">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoggedInLayout;
