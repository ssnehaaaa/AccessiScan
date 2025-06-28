import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // ✅ Correct logo import

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 rounded-b-xl shadow-md bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100">
      
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-bold text-indigo-700">AccessiScan</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6 text-gray-700 font-medium">
        <li>
          <Link to="/resources" className="hover:text-indigo-700 transition">
            Resources
          </Link>
        </li>
        <li>
          <Link to="/pricing" className="hover:text-indigo-700 transition">
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition">
              Get Started
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
