import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Typography } from '../atoms/Typography';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        p-6 
        h-full
        bg-white dark:bg-gray-800 
        rounded-xl 
        shadow-lg 
        hover:shadow-xl 
        transition-shadow 
        duration-300
        border 
        border-gray-200 
        dark:border-gray-700
        ${className}
      `}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
          <Icon className="h-6 w-6 text-primary-500" />
        </div>
        <Typography variant="h5" color="default">
          {title}
        </Typography>
      </div>
      <Typography variant="body" color="muted">
        {description}
      </Typography>
    </motion.div>
  );
};