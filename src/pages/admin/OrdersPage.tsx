import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import api from '../../services/api';
import { getStatusColor } from '../../components/utils/statusUtils';

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
          block w-full px-3 py-2 text-sm
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
    <div className="min-h-screen w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-full px-3 sm:px-4 py-4 mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div className="flex-1 min-w-0">
            <Typography variant="h1" color="default" className="text-xl sm:text-2xl mb-2">
              Órdenes
            </Typography>
            <Typography variant="body" color="muted" className="text-sm sm:text-base">
              Gestiona las órdenes de tus clientes ({pagination?.totalOrders || 0} total)
            </Typography>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 w-full mb-6"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
            <div className="flex-1 min-w-0 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por email o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 text-sm"
              />
            </div>
            
            <div className="w-full sm:w-48 lg:w-56">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'Todos los estados' },
                  { value: 'pending', label: 'Pendiente' },
                  { value: 'paid', label: 'Pagado' },
                  { value: 'failed', label: 'Fallido' },
                ]}
                placeholder="Estado"
                className="w-full"
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={Filter}
              iconPosition="left"
              className="w-full sm:w-auto min-w-[120px]"
            >
              Filtrar
            </Button>
          </form>
        </motion.div>

        {/* Lista de Órdenes - Mobile & Tablet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 w-full"
        >
          {loading ? (
            <div className="p-8 text-center rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <Typography variant="body" color="muted">
                Cargando órdenes...
              </Typography>
            </div>
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 w-full"
              >
                {/* Header de la orden */}
                <div className="flex justify-between items-start gap-3 mb-3 w-full">
                  <div className="flex-1 min-w-0">
                    <Typography variant="h6" color="default" className="text-sm font-medium break-words">
                      Orden #{order._id.slice(-8).toUpperCase()}
                    </Typography>
                    <Typography variant="caption" color="muted" className="text-xs">
                      {order.items.length} producto(s)
                    </Typography>
                  </div>
                  <div className="flex-shrink-0">
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
                </div>

                {/* Información del cliente */}
                <div className="mb-3">
                  <Typography variant="caption" color="muted" className="block mb-1 text-xs">
                    Cliente
                  </Typography>
                  <Typography variant="body" color="default" className="text-sm font-medium break-words">
                    {order.shippingAddress.name}
                  </Typography>
                  <Typography variant="caption" color="muted" className="text-xs break-words">
                    {order.customerEmail}
                  </Typography>
                </div>

                {/* Detalles de la orden */}
                <div className="grid grid-cols-2 gap-4 text-xs w-full">
                  <div className="space-y-1">
                    <Typography variant="caption" color="muted" className="block">
                      Total
                    </Typography>
                    <Typography variant="body" color="default" className="font-medium text-sm">
                      {order.currency} {order.total.toFixed(2)}
                    </Typography>
                  </div>
                  <div className="space-y-1">
                    <Typography variant="caption" color="muted" className="block">
                      Fecha
                    </Typography>
                    <Typography variant="caption" color="default" className="text-xs">
                      {formatDate(order.createdAt)}
                    </Typography>
                  </div>
                </div>

                {/* Acciones */}
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full">
                    <div className="flex-1">
                      <Select
                        value={order.paymentStatus}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        options={[
                          { value: 'pending', label: 'Pendiente' },
                          { value: 'paid', label: 'Pagado' },
                          { value: 'failed', label: 'Fallido' },
                        ]}
                        className="w-full text-xs"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Eye}
                      title="Ver detalles"
                      className="w-full sm:w-auto"
                      children={undefined}
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {/* Paginación */}
          {pagination && pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 w-full"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <Typography variant="body" color="muted" className="text-sm text-center sm:text-left">
                  Mostrando {orders.length} de {pagination.totalOrders} órdenes
                </Typography>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchOrders(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrev}
                  >
                    Anterior
                  </Button>
                  <Typography variant="body" color="muted" className="text-sm min-w-[80px] text-center">
                    {pagination.currentPage}/{pagination.totalPages}
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrdersPage;