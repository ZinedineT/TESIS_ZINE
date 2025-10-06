import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { ChatbotFloat } from '../atoms/Chatbot';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen w-full relative ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Background Gradients */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: theme === 'dark'
            ? "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000"
            : "radial-gradient(125% 125% at 50% 80%, #fff 40%, #b3c1ff 100%)"
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className={`flex-1 ${className}`}>
          {children}
        </main>
        {!isAdmin && <Footer />} 
        <ChatbotFloat />
      </div>
    </div>
  );
};
