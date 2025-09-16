import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Users, CreditCard, BarChart3, TrendingUp } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography';
import api from '../../services/api';
import { getStatusIcon, getStatusColor } from '../../components/utils/statusUtils';

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
}

export const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data.stats);
        setRecentOrders(response.data.recentOrders || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="body" color="muted">
          Cargando...
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
        <Typography variant="h1" color="default" className="mb-6">
          Panel de Administración
        </Typography>

        {/* Cards de Métricas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <MetricCard
            icon={Users}
            title="Usuarios"
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
            icon={BarChart3}
            title="Ingresos"
            value={`S/. ${(stats?.totalRevenue || 0).toFixed(2)}`}
            trend="+18%"
            color="warning"
          />
        </motion.div>

        {/* Órdenes Recientes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <Typography variant="h2" color="default" className="mb-4">
            Órdenes Recientes
          </Typography>
          <div className="space-y-3">
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
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600">
      <div>
        <Typography variant="h6" color="default">
          #{order._id.slice(-6)}
        </Typography>
        <Typography variant="caption" color="muted">
          {order.customerEmail}
        </Typography>
      </div>
      <div className="text-right">
        <Typography variant="h6" color="default">
          S/. {order.total.toFixed(2)}
        </Typography>
        <div className="flex items-center gap-2 justify-end">
          {getStatusIcon(order.paymentStatus)}
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.paymentStatus)}`}>
            <Typography
              variant="caption"
              color={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'pending' ? 'warning' : 'error'}
            >
              {order.paymentStatus}
            </Typography>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;