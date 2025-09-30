import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Inicio' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/productos', label: 'Productos' },
  { path: '/contacto', label: 'Contacto' },
];

interface NavigationProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ mobile = false, onItemClick }) => {
  const location = useLocation();

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-1">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={item.path}
              onClick={onItemClick}
              className={`
                block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg
                ${location.pathname === item.path
                  ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`
            text-base font-medium transition-all duration-200 relative
            ${location.pathname === item.path
              ? 'text-primary-500'
              : 'text-gray-700 dark:text-gray-300 hover:text-primary-500'
            }
          `}
        >
          {item.label}
          {location.pathname === item.path && (
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-500"
              layoutId="activeNavIndicator"
            />
          )}
        </Link>
      ))}
    </nav>
  );
};