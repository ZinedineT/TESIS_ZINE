import React from 'react';
import { HeroSection } from '../components/organisms/HeroSection';
import { ServicesGrid } from '../components/organisms/ServicesGrid';
import { ProductsShowcase } from '../components/organisms/ProductsShowcase';
import { BlogGrid } from '../components/organisms/BlogGrid';

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <ProductsShowcase />
      <BlogGrid />
    </>
  );
};