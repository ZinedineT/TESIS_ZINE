import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import api from '../../services/api';
import { getStatusIcon, getStatusColor } from '../../components/utils/statusUtils';

interface Order {
  _id: string;
  total: number;
  currency: string;
  paymentStatus: string;
  customerEmail: string;
  shippingAddress: {
    name: string;
    line1: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    unitPrice: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  required = false,
  options,
  placeholder,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Typography variant="caption" color="default" className="font-medium">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </Typography>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`
          block w-full px-3 py-2 
          border rounded-lg 
          shadow-sm 
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100 
          border-gray-300 dark:border-gray-600 
          focus:outline-none 
          focus:ring-2 
          focus:ring-primary-500 
          focus:border-primary-500
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== 'all' && { status: statusFilter }),
      });

      const response = await api.get(`/admin/orders?${params}`);
      setOrders(response.data.orders);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(1);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.put(`/admin/orders/${orderId}`, { status: newStatus });
      alert('Estado actualizado exitosamente');
      fetchOrders(pagination?.currentPage || 1);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error al actualizar el estado');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Typography variant="h1" color="default" className="mb-2">
              Órdenes
            </Typography>
            <Typography variant="body" color="muted">
              Gestiona las órdenes de tus clientes ({pagination?.totalOrders || 0} total)
            </Typography>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por email o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Todos los estados' },
                { value: 'pending', label: 'Pendiente' },
                { value: 'paid', label: 'Pagado' },
                { value: 'failed', label: 'Fallido' },
              ]}
              placeholder="Seleccionar estado"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Filter}
              iconPosition="left"
            >
              Filtrar
            </Button>
          </form>
        </motion.div>

        {/* Tabla de Órdenes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          {loading ? (
            <div className="p-8 text-center">
              <Typography variant="body" color="muted">
                Cargando órdenes...
              </Typography>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Orden
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Cliente
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Total
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Estado
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Fecha
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Acciones
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {orders.map((order, index) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4">
                          <Typography variant="h6" color="default">
                            #{order._id.slice(-8).toUpperCase()}
                          </Typography>
                          <Typography variant="caption" color="muted">
                            {order.items.length} producto(s)
                          </Typography>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <Typography variant="h6" color="default">
                              {order.shippingAddress.name}
                            </Typography>
                            <Typography variant="caption" color="muted">
                              {order.customerEmail}
                            </Typography>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Typography variant="body" color="default">
                            {order.currency} {order.total.toFixed(2)}
                          </Typography>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.paymentStatus)}
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.paymentStatus)}`}>
                              <Typography
                                variant="caption"
                                color={
                                  order.paymentStatus === 'paid'
                                    ? 'success'
                                    : order.paymentStatus === 'pending'
                                    ? 'warning'
                                    : order.paymentStatus === 'failed'
                                    ? 'error'
                                    : 'muted'
                                }
                              >
                                {order.paymentStatus}
                              </Typography>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Typography variant="caption" color="muted">
                            {formatDate(order.createdAt)}
                          </Typography>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Select
                              value={order.paymentStatus}
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                              options={[
                                { value: 'pending', label: 'Pendiente' },
                                { value: 'paid', label: 'Pagado' },
                                { value: 'failed', label: 'Fallido' },
                              ]}
                              className="text-xs"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={Eye}
                              title="Ver detalles" children={undefined}                            />
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {pagination && pagination.totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="px-6 py-4 border-t border-gray-200 dark:border-gray-600"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Typography variant="body" color="muted">
                      Mostrando {orders.length} de {pagination.totalOrders} órdenes
                    </Typography>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchOrders(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrev}
                      >
                        Anterior
                      </Button>
                      <Typography variant="body" color="muted">
                        Página {pagination.currentPage} de {pagination.totalPages}
                      </Typography>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchOrders(pagination.currentPage + 1)}
                        disabled={!pagination.hasNext}
                      >
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrdersPage;