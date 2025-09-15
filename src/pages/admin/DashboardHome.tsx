import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Users, 
  CreditCard, 
  BarChart3,
  TrendingUp, 
} from 'lucide-react';
import api  from '../../services/api'; // Ajusta tu cliente API

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
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Panel de Administración
      </h1>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Users}
          title="Usuarios"
          value={stats?.totalUsers || 0}
          trend="+12%"
          color="blue"
        />
        <MetricCard
          icon={Package}
          title="Productos"
          value={stats?.totalProducts || 0}
          trend="+5%"
          color="green"
        />
        <MetricCard
          icon={CreditCard}
          title="Órdenes"
          value={stats?.totalOrders || 0}
          trend="+23%"
          color="purple"
        />
        <MetricCard
          icon={BarChart3}
          title="Ingresos"
          value={`S/. ${(stats?.totalRevenue || 0).toFixed(2)}`}
          trend="+18%"
          color="orange"
        />
      </div>

      {/* Órdenes Recientes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Órdenes Recientes</h2>
        <div className="space-y-3">
          {recentOrders.slice(0, 5).map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente de Tarjeta de Métrica
const MetricCard: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  title: string;
  value: number | string;
  trend: string;
  color: string;
}> = ({ icon: Icon, title, value, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-full ${colorClasses[color]} bg-opacity-10`}>
          <Icon className={`h-6 w-6 ${colorClasses[color].replace('bg-', 'text-')}`} />
        </div>
        <span className="text-sm text-green-500 flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          {trend}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    </motion.div>
  );
};

// Componente de Item de Orden
const OrderItem: React.FC<{ order: RecentOrder }> = ({ order }) => {
  const statusColors = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
      <div>
        <p className="font-medium">#{order._id.slice(-6)}</p>
        <p className="text-sm text-gray-600">{order.customerEmail}</p>
      </div>
      <div className="text-right">
        <p className="font-bold">S/. {order.total.toFixed(2)}</p>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.paymentStatus]}`}>
          {order.paymentStatus}
        </span>
      </div>
    </div>
  );
};

export default DashboardHome;