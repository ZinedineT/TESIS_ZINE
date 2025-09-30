import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import FunctionalitySection from '../components/sections/FunctionalitySection';
import TrustSection  from '../components/sections/TrustSection';
import PricingSection from '../components/sections/PricingSection';

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <FunctionalitySection/>
      <PricingSection/>
      <TrustSection/>
    </>
  );
};