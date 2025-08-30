import React from 'react';
import { Building2 } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 text-lg',
    md: 'h-8 w-8 text-xl',
    lg: 'h-10 w-10 text-2xl',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="p-2 rounded-lg bg-primary-500 text-white">
        <Building2 className={sizeClasses[size]} />
      </div>
      <span className={`font-bold text-primary-500 ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'}`}>
        Cistcor
      </span>
    </div>
  );
};