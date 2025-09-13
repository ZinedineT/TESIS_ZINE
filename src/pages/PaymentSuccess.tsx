import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Mail, Clock } from 'lucide-react';
import { checkoutService } from '../services/checkoutService';
import { Button } from '../components/atoms/Button';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      checkOrderStatus();
    }
  }, [sessionId]);

  const checkOrderStatus = async () => {
    try {
      const status = await checkoutService.getOrderStatus(sessionId!);
      if (status.paymentStatus === 'paid') {
        const orderData = await checkoutService.getOrder(status.orderId);
        setOrder(orderData);
      }
    } catch (error) {
      console.error('Error checking order status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verificando pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Pago Exitoso!
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Gracias por tu compra. Tu pedido ha sido procesado correctamente.
          </p>

          {order && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Detalles del Pedido
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-blue-500" />
                  <span>N° de orden: {order._id}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>Email: {order.customerEmail}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Fecha: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold">Total: S/ {order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.href = '/productos'}>
              Seguir Comprando
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/perfil'}>
              Ver Mis Pedidos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
