import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserMenu } from './userMenu';
import { CartIcon } from './CartIcon';
import { CartDrawer } from '../organisms/CartDrawer';

interface AuthButtonProps {
  mobile?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ mobile = false }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (user) {
    if (mobile) {
      return (
        <>
          <div className="flex items-center gap-3">
            <CartIcon onClick={() => setIsCartOpen(true)} />
            <UserMenu
              user={user}
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
              onLogout={logout}
              mobile={true}
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
      <>
        <div className="flex items-center gap-4">
          <CartIcon onClick={() => setIsCartOpen(true)} />
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

  if (mobile) {
    return (
      <div className="flex items-center gap-1">
      <a
        href="/login"
        className="px-2 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Inicio
      </a>
      <a
        href="/register"
        className="px-2 py-1.5 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Regístrate
      </a>
      </div>
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