import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  price?: string;
  features?: string[];
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  image,
  price,
  features = [],
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl 
        shadow-lg 
        hover:shadow-xl 
        overflow-hidden 
        transition-shadow 
        duration-300
        border 
        border-gray-200 
        dark:border-gray-700
        ${className}
      `}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Typography variant="h5" color="default">
            {title}
          </Typography>
          {price && (
            <span className="text-primary-500 font-semibold text-lg">
              {price}
            </span>
          )}
        </div>
        
        <Typography variant="body" color="muted" className="mb-4">
          {description}
        </Typography>
        
        {features.length > 0 && (
          <ul className="space-y-1 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
        )}
        
        <Button 
          variant="outline" 
          size="sm"
          icon={ExternalLink}
          iconPosition="right"
          className="w-full"
        >
          Ver Detalles
        </Button>
      </div>
    </motion.div>
  );
};