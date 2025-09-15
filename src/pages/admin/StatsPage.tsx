import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  CreditCard, 
  DollarSign
} from 'lucide-react';
import api from '../../services/api';

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
        <div className="text-lg">Cargando estadísticas...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Estadísticas</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Métricas y análisis de tu tienda
          </p>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent"
        >
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="year">Este año</option>
          <option value="all">Todo el tiempo</option>
        </select>
      </div>

      {/* Cards de Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Users}
          title="Usuarios Totales"
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
          icon={DollarSign}
          title="Ingresos Totales"
          value={`S/. ${(stats?.totalRevenue || 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
          trend="+18%"
          color="orange"
        />
      </div>

      {/* Gráficos y Detalles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Ingresos (Placeholder) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Ingresos Mensuales</h2>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <BarChart3 className="h-12 w-12 mx-auto mb-2" />
              <p>Gráfico de ingresos</p>
              <p className="text-sm">(Se integrará con Chart.js o Recharts)</p>
            </div>
          </div>
        </div>

        {/* Órdenes Recientes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Órdenes Recientes</h2>
          <div className="space-y-4">
            {recentOrders.slice(0, 5).map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
            {recentOrders.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <CreditCard className="h-12 w-12 mx-auto mb-2" />
                <p>No hay órdenes recientes</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Métricas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <Package className="h-12 w-12 mx-auto mb-2" />
            <p>Análisis de productos populares</p>
            <p className="text-sm">(Próximamente)</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Tendencia de Usuarios</h3>
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <Users className="h-12 w-12 mx-auto mb-2" />
            <p>Gráfico de crecimiento de usuarios</p>
            <p className="text-sm">(Próximamente)</p>
          </div>
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded">
          <CreditCard className="h-4 w-4 text-blue-600" />
        </div>
        <div>
          <p className="font-medium text-sm">#{order._id.slice(-6)}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {order.shippingAddress.name}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-bold text-sm">S/. {order.total.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.paymentStatus]}`}>
            {order.paymentStatus}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(order.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;