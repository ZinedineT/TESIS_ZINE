import React from 'react';
import logo from '../../assets/favicon.png';
import { useTheme } from '../../contexts/ThemeContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const { theme } = useTheme();
  const sizeClasses = {
    sm: 'h-6 w-6 text-lg',
    md: 'h-8 w-8 text-xl',
    lg: 'h-10 w-10 text-2xl',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logo}
        alt="Logo Cistcor"
        className={`${sizeClasses[size]} w-auto`} // Mantiene proporción
      />
      <span
        className={`font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        } ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'}`}
      >
        CISTCOR
      </span>

    </div>
  );
};
