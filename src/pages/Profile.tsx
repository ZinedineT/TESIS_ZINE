// src/pages/Profile.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Mi Perfil
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <User className="h-6 w-6 text-primary-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nombre</p>
              <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Mail className="h-6 w-6 text-primary-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Shield className="h-6 w-6 text-primary-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rol</p>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {user.role === 'admin' && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200">
              Tienes acceso al panel de administración. Puedes gestionar productos y órdenes.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
