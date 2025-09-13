import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, total, totalItems, removeFromCart, clearCart, loading } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg z-50"
        >
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary-500" />
                <Typography variant="h6" color="default">
                  Carrito ({totalItems})
                </Typography>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            {loading ? (
              <div className="text-center py-8">
                <Typography variant="body" color="muted">Cargando carrito...</Typography>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8">
                <Typography variant="body" color="muted">Tu carrito está vacío</Typography>
                <Button variant="outline" className="mt-4" onClick={onClose}>
                  Continuar comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4 p-3 border rounded-lg">
                    <img
                      src={item.product?.images?.[0] || 'https://via.placeholder.com/60'}
                      alt={item.product?.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <Typography variant="body" className="font-medium">
                        {item.product?.title}
                      </Typography>
                      <Typography variant="caption" color="muted">
                        Cantidad: {item.quantity}
                      </Typography>
                      <Typography variant="body" color="primary" className="mt-1">
                        S/ {(item.priceAtMoment * item.quantity).toFixed(2)}
                      </Typography>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.productId)}
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t dark:border-gray-700">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="body">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    S/ {total.toFixed(2)}
                  </Typography>
                </div>
                <Button variant="primary" className="w-full" onClick={onClose}>
                  Ir al Checkout
                </Button>
                <Button variant="outline" className="w-full" onClick={clearCart} disabled={loading}>
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  );
};
