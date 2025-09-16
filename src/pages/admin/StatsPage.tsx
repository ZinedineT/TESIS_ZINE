import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Package, CreditCard, DollarSign } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography';
import api from '../../services/api';
import { getStatusColor, getStatusIcon } from '../../components/utils/statusUtils';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

interface RecentOrder {
  _id: string;
  total: number;
  paymentStatus: string;
  customerEmail: string;
  createdAt: string;
  shippingAddress: {
    name: string;
  };
}

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <select
        value={value}
        onChange={onChange}
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
          [&_option]:text-gray-900 dark:[&_option]:text-gray-400
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

export const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/stats?range=${timeRange}`);
      setStats(response.data.stats);
      setRecentOrders(response.data.recentOrders || []);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Typography variant="body" color="muted">
          Cargando estadísticas...
        </Typography>
      </div>
    );
  }

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
              Estadísticas
            </Typography>
            <Typography variant="body" color="muted">
              Métricas y análisis de tu tienda
            </Typography>
          </div>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            options={[
              { value: 'week', label: 'Esta semana' },
              { value: 'month', label: 'Este mes' },
              { value: 'year', label: 'Este año' },
              { value: 'all', label: 'Todo el tiempo' },
            ]}
            placeholder="Seleccionar rango"
            className="min-w-[200px]"
          />
        </div>

        {/* Cards de Métricas Principales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <MetricCard
            icon={Users}
            title="Usuarios Totales"
            value={stats?.totalUsers || 0}
            trend="+12%"
            color="primary"
          />
          <MetricCard
            icon={Package}
            title="Productos"
            value={stats?.totalProducts || 0}
            trend="+5%"
            color="success"
          />
          <MetricCard
            icon={CreditCard}
            title="Órdenes"
            value={stats?.totalOrders || 0}
            trend="+23%"
            color="accent"
          />
          <MetricCard
            icon={DollarSign}
            title="Ingresos Totales"
            value={`S/. ${(stats?.totalRevenue || 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
            trend="+18%"
            color="warning"
          />
        </motion.div>

        {/* Gráficos y Detalles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Gráfico de Ingresos (Placeholder) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h2" color="default">
                Ingresos Mensuales
              </Typography>
              <TrendingUp className="h-5 w-5 text-success-500" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <Typography variant="body" color="muted">
                  Gráfico de ingresos
                </Typography>
                <Typography variant="caption" color="muted">
                  (Se integrará con Chart.js o Recharts)
                </Typography>
              </div>
            </div>
          </div>

          {/* Órdenes Recientes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <Typography variant="h2" color="default" className="mb-6">
              Órdenes Recientes
            </Typography>
            <div className="space-y-4">
              {recentOrders.slice(0, 5).map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <OrderItem order={order} />
                </motion.div>
              ))}
              {recentOrders.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <CreditCard className="h-12 w-12 mx-auto mb-2" />
                  <Typography variant="body" color="muted">
                    No hay órdenes recientes
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Métricas Adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <Typography variant="h3" color="default" className="mb-4">
              Productos Más Vendidos
            </Typography>
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <Package className="h-12 w-12 mx-auto mb-2" />
              <Typography variant="body" color="muted">
                Análisis de productos populares
              </Typography>
              <Typography variant="caption" color="muted">
                (Próximamente)
              </Typography>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <Typography variant="h3" color="default" className="mb-4">
              Tendencia de Usuarios
            </Typography>
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <Users className="h-12 w-12 mx-auto mb-2" />
              <Typography variant="body" color="muted">
                Gráfico de crecimiento de usuarios
              </Typography>
              <Typography variant="caption" color="muted">
                (Próximamente)
              </Typography>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Componente de Tarjeta de Métrica
const MetricCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: number | string;
  trend: string;
  color: 'primary' | 'success' | 'accent' | 'warning';
}> = ({ icon: Icon, title, value, trend, color }) => {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-500 dark:bg-primary-900/30 dark:text-primary-300',
    success: 'bg-success-100 text-success-500 dark:bg-success-900/30 dark:text-success-300',
    accent: 'bg-accent-100 text-accent-500 dark:bg-accent-900/30 dark:text-accent-300',
    warning: 'bg-warning-100 text-warning-500 dark:bg-warning-900/30 dark:text-warning-300',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-full ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <Typography variant="caption" color="success" className="flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          {trend}
        </Typography>
      </div>
      <Typography variant="h3" color="default" className="mb-1">
        {value}
      </Typography>
      <Typography variant="body" color="muted">
        {title}
      </Typography>
    </motion.div>
  );
};

// Componente de Item de Orden
const OrderItem: React.FC<{ order: RecentOrder }> = ({ order }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded">
          <CreditCard className="h-4 w-4 text-primary-600 dark:text-primary-300" />
        </div>
        <div>
          <Typography variant="h6" color="default">
            #{order._id.slice(-6)}
          </Typography>
          <Typography variant="caption" color="muted">
            {order.shippingAddress.name}
          </Typography>
        </div>
      </div>
      <div className="text-right">
        <Typography variant="h6" color="default">
          S/. {order.total.toFixed(2)}
        </Typography>
        <div className="flex items-center gap-2 mt-1 justify-end">
          {getStatusIcon(order.paymentStatus)}
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.paymentStatus)}`}>
            <Typography
              variant="caption"
              color={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'pending' ? 'warning' : 'error'}
            >
              {order.paymentStatus}
            </Typography>
          </span>
          <Typography variant="caption" color="muted">
            {formatDate(order.createdAt)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;