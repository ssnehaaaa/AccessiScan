import React, { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authState } from '../recoil/authAtom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import DidYouKnow from '../components/DidYouKnow';
import WhyAccessibilityMatters from '../components/WhyAccessibilityMatters';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';


const LandingPage = () => {
  const { isLoggedIn } = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);
  
  return (
  <div className="bg-[#e9f0f5] min-h-screen">
  <Navbar />
  <HeroSection />
  <DidYouKnow />
  <WhyAccessibilityMatters />
  <HowItWorks />
  <CallToAction />
  <Footer />
  </div>
  );
};

export default LandingPage;
