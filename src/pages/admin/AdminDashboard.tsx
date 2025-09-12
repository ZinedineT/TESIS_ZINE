// src/pages/admin/AdminDashboard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Users, CreditCard, BarChart3 } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Panel de Administración
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/admin/products"
            className="flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Package className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Productos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gestionar inventario</p>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-4 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <CreditCard className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Órdenes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ver pedidos</p>
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-4 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <Users className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Usuarios</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gestionar clientes</p>
            </div>
          </Link>

          <Link
            to="/admin/stats"
            className="flex items-center gap-4 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
          >
            <BarChart3 className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Estadísticas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ver métricas</p>
            </div>
          </Link>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Bienvenido al Panel de Administración
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Desde aquí puedes gestionar todos los aspectos de tu tienda online.
            Usa el menú superior para navegar entre las diferentes secciones.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
