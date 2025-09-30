import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { motion } from 'framer-motion';

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar para desktop y móvil */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar}
      />
      
      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Contenido Principal */}
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Botón hamburguesa para móvil */}
        <div className="lg:hidden fixed top-20 left-4 z-40">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto p-4 lg:p-6 pt-24 lg:pt-6"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};