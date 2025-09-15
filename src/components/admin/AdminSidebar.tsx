import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Package, 
  Users, 
  CreditCard, 
  BarChart3, 
  Home,
  LogOut 
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { path: '/admin', label: 'Inicio', icon: Home },
  { path: '/admin/products', label: 'Productos', icon: Package },
  { path: '/admin/orders', label: 'Órdenes', icon: CreditCard },
  { path: '/admin/users', label: 'Usuarios', icon: Users },
  { path: '/admin/stats', label: 'Estadísticas', icon: BarChart3 },
];

export const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen p-4 fixed left-0 top-0"
    >
      {/* Logo/Título */}
      <div className="mb-8 p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Panel Admin
        </h2>
      </div>

      {/* Menú de Navegación */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
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
        <button className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </motion.div>
  );
};