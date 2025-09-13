// src/components/molecules/AuthButton.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserMenu } from './userMenu';
import { CartIcon } from './CartIcon';
import { CartDrawer } from '../organisms/CartDrawer';

export const AuthButton: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (user) {
    return (
      <>
        <div className="flex items-center gap-4">
          {/* Icono del carrito */}
          <CartIcon onClick={() => setIsCartOpen(true)} />

          {/* Menú de usuario */}
          <UserMenu
            user={user}
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
            onLogout={logout}
          />
        </div>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </>
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
