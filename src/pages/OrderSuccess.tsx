// src/pages/OrderSuccess.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Mail, Clock, Home, ShoppingBag } from 'lucide-react';
import { checkoutService } from '../services/checkoutService';
import { Button } from '../components/atoms/Button';
import { motion } from 'framer-motion';

export const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId) {
      checkOrderStatus();
    } else {
      setError('No se encontró información de la orden');
      setLoading(false);
    }
  }, [sessionId]);

  const checkOrderStatus = async () => {
    try {
      const status = await checkoutService.getOrderStatus(sessionId!);
      console.log('Estado del pago:', status);

      if (status.paymentStatus === 'paid') {
        const orderData = await checkoutService.getOrder(status.orderId);
        setOrder(orderData);
      } else {
        setError(`Estado del pago: ${status.paymentStatus}`);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error checking order status:', err);
      setError(err.response?.data?.message || 'Error al verificar el estado de la orden');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verificando tu orden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg mb-4">
            {error}
          </div>
          <Button onClick={() => window.location.href = '/productos'}>
            Volver a Productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
            ¡Orden Confirmada!
          </h1>

          <p className="text-black dark:text-white mb-8">
            Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
          </p>

          {order && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Detalles de tu Orden
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">Orden #: {order._id?.substring(0, 8).toUpperCase()}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">Email: {order.customerEmail || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm">
                    Fecha: {new Date(order.createdAt).toLocaleDateString('es-PE')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Total: S/ {order.total?.toFixed(2) || '0.00'}
                  </span>
                </div>

                {order.shippingAddress && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                      Dirección de Envío:
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.shippingAddress.name}<br />
                      {order.shippingAddress.line1}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => window.location.href = '/productos'}
              className="flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Seguir Comprando
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.href = '/perfil'}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Ver Mis Pedidos
            </Button>

            <Button
              variant="ghost"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Inicio
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          >
            <p className="text-sm text-blue-800 dark:text-blue-200">
              📧 Recibirás un correo de confirmación con los detalles de tu compra.
              <br />
              ⏰ Tu pedido será procesado en las próximas 24 horas.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
