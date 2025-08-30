import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen w-full relative ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Background Gradients */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: theme === 'dark' 
            ? `
                radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
                radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
                radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
              `
            : `
                linear-gradient(to right, #f0f0ff 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0ff 1px, transparent 1px),
                radial-gradient(circle 900px at 50% 50%, rgba(77, 98, 218, 0.1), transparent)
              `,
          backgroundSize: theme === 'dark' ? 'auto' : '100px 100px, 100px 100px, auto',
        }}
      />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className={`flex-1 ${className}`}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};