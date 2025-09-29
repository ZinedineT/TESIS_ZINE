import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Package, CreditCard, DollarSign } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography';
import api from '../../services/api';
import { getStatusColor, getStatusIcon } from '../../components/utils/statusUtils';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

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
// Nuevas interfaces para los datos de gráficos
interface ChartData {
  _id: string;
  revenue?: number;
  orders?: number;
  count?: number;
}

interface TopProduct {
  _id: string;
  totalSold: number;
  revenue: number;
  product: {
    title: string;
    images: string[];
  };
}

interface DashboardCharts {
  revenueData: ChartData[];
  ordersByStatus: ChartData[];
  userTrend: ChartData[];
  topProducts: TopProduct[];
}

interface DashboardResponse {
  stats: DashboardStats;
  charts: DashboardCharts;
  recentOrders: RecentOrder[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lowStockProducts: any[];
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
  const [charts, setCharts] = useState<DashboardCharts | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get<DashboardResponse>(`/admin/stats?range=${timeRange}`);
      setStats(response.data.stats);
      setCharts(response.data.charts);
      setRecentOrders(response.data.recentOrders || []);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };
    // Colores para gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  const statusColors: { [key: string]: string } = {
    paid: '#00C49F',
    pending: '#FFBB28',
    failed: '#FF8042',
    refunded: '#8884D8'
  };
    // Formatear datos para gráfico de estados de orden
  const getOrdersByStatusData = () => {
    if (!charts?.ordersByStatus) return [];
    return charts.ordersByStatus.map(item => ({
      name: item._id,
      value: item.count,
      color: statusColors[item._id] || COLORS[0]
    }));
  };

  // Formatear datos para productos más vendidos
  const getTopProductsData = () => {
    if (!charts?.topProducts) return [];
    return charts.topProducts.map(item => ({
      name: item.product.title.length > 15 
        ? item.product.title.substring(0, 15) + '...' 
        : item.product.title,
      ventas: item.totalSold,
      ingresos: item.revenue
    }));
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
          {/* Gráfico de Ingresos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h2" color="default">
                Ingresos Mensuales
              </Typography>
              <TrendingUp className="h-5 w-5 text-success-500" />
            </div>
            <div className="h-64">
              {charts?.revenueData && charts.revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={charts.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="_id" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value) => [`S/. ${Number(value).toFixed(2)}`, 'Ingresos']}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#0088FE" 
                      strokeWidth={2}
                      name="Ingresos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Typography variant="body" color="muted">
                    No hay datos de ingresos para el período seleccionado
                  </Typography>
                </div>
              )}
            </div>
          </div>

          {/* Órdenes por Estado */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <Typography variant="h2" color="default" className="mb-6">
              Órdenes por Estado
            </Typography>
            <div className="h-64">
              {getOrdersByStatusData().length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getOrdersByStatusData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getOrdersByStatusData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Typography variant="body" color="muted">
                    No hay datos de órdenes
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Métricas Adicionales - ACTUALIZADO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Productos Más Vendidos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <Typography variant="h3" color="default" className="mb-4">
              Productos Más Vendidos
            </Typography>
            <div className="h-64">
              {getTopProductsData().length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getTopProductsData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'ingresos') return [`S/. ${Number(value).toFixed(2)}`, 'Ingresos'];
                        return [value, 'Ventas'];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="ventas" fill="#8884d8" name="Unidades Vendidas" />
                    <Bar dataKey="ingresos" fill="#82ca9d" name="Ingresos (S/.)" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Package className="h-12 w-12 mx-auto mb-2" />
                  <Typography variant="body" color="muted">
                    No hay datos de productos vendidos
                  </Typography>
                </div>
              )}
            </div>
          </div>

          {/* Tendencia de Usuarios */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <Typography variant="h3" color="default" className="mb-4">
              Tendencia de Usuarios
            </Typography>
            <div className="h-64">
              {charts?.userTrend && charts.userTrend.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={charts.userTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#00C49F" 
                      strokeWidth={2}
                      name="Nuevos Usuarios"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-2" />
                  <Typography variant="body" color="muted">
                    No hay datos de tendencia de usuarios
                  </Typography>
                </div>
              )}
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