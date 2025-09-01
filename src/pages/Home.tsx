import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import FunctionalitySection from '../components/sections/FunctionalitySection';
// import { ProductsShowcase } from '../components/sections/ProductsShowcase';
// import { BlogGrid } from '../components/sections/BlogGrid';
import TrustSection  from '../components/sections/TrustSection';

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <FunctionalitySection/>
      <TrustSection/>
      {/* <ProductsShowcase /> */}
      {/* <BlogGrid /> */}
    </>
  );
};