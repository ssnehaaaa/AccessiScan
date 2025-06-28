import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white text-center py-4 shadow-inner mt-auto">
      <div className="text-sm text-gray-600">
        <a href="https://github.com/" className="text-green-600 hover:underline mr-4">
          GitHub
        </a>
        |
        <a href="/resume.pdf" className="text-green-600 hover:underline ml-4">
          Resume
        </a>
        <p className="mt-2">
          Made with <span className="text-red-500">❤️</span> by <span className="font-semibold text-green-600">Sneha Kumari</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
