import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { Typography } from '../atoms/Typography';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime?: string;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  image,
  date,
  author,
  readTime,
  className = '',
}) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
        cursor-pointer
          h-full // ← Esto hace que ocupe toda la altura del grid
          flex-col // ←
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
        <Typography variant="h6" color="default" className="mb-3 line-clamp-2">
          {title}
        </Typography>

        <Typography variant="body" color="muted" className="mb-4 line-clamp-3">
          {excerpt}
        </Typography>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{author}</span>
          </div>
          {readTime && (
            <span>• {readTime}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
};
