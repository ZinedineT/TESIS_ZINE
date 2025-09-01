import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Logo } from '../atoms/Logo';
import { Navigation } from '../molecules/Navigation';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { Button } from '../atoms/Button';

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Navigation */}
          <Navigation />

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* AI Chatbot Placeholder */}
            <Button
              variant="ghost"
              size="sm"
              icon={Bot}
              className="hidden sm:flex"
            >
              Chatbot
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
};
