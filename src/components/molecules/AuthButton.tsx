// src/components/molecules/AuthButton.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserMenu } from './userMenu';

export const AuthButton: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (user) {
    return (
      <UserMenu
        user={user}
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
        onLogout={logout}
      />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href="/login"
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Iniciar Sesión
      </a>
      <a
        href="/register"
        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Registrarse
      </a>
    </div>
  );
};
