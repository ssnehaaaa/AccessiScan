import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingSection from '../components/PricingSection';

const PricingPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#f0f4f8] via-[#e7f5f0] to-[#fdfdfd] min-h-screen">
      <Navbar />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default PricingPage;
