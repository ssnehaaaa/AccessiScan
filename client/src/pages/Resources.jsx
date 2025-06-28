import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Resources from '../components/ResourceCard';

const ResourcesPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#f0f4f8] via-[#e7f5f0] to-[#fefefe] min-h-screen">
      <Navbar />
      <main className="px-6 py-12">
        <Resources />
      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
