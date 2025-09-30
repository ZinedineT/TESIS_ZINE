import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Package,
  Users,
  CreditCard,
  BarChart3,
  Home,
  LogOut,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { path: '/admin', label: 'Inicio', icon: Home },
  { path: '/admin/products', label: 'Productos', icon: Package },
  { path: '/admin/orders', label: 'Órdenes', icon: CreditCard },
  { path: '/admin/users', label: 'Usuarios', icon: Users },
  { path: '/admin/stats', label: 'Estadísticas', icon: BarChart3 },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();

  const onLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  const handleItemClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const sidebarContent = (
    <>
      {/* Header con botón cerrar en móvil */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Panel Admin
        </h2>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      {/* Menú de Navegación */}
      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleItemClick}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer/Logout */}
      <div className="absolute bottom-4 left-4 right-4">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Sidebar para desktop */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:block w-64 shadow-lg min-h-screen fixed left-0 top-0 z-30"
      >
        {sidebarContent}
      </motion.div>

      {/* Sidebar para móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg min-h-screen fixed left-0 top-0 z-50"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};