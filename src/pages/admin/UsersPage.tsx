import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, User, Mail, Calendar, UserCheck, UserX, Trash2 } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import api from '../../services/api';
import { getStatusColor } from '../../components/utils/statusUtils';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  isActive?: boolean;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  hasNext: boolean;
  hasPrev: boolean;
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

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(roleFilter !== 'all' && { role: roleFilter }),
      });

      const response = await api.get(`/admin/users?${params}`);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await api.put(`/admin/users/${userId}/status`, { isActive: !currentStatus });
      alert('Estado del usuario actualizado');
      fetchUsers(pagination?.currentPage || 1);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Error al actualizar el usuario');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      alert('Usuario eliminado exitosamente');
      fetchUsers(pagination?.currentPage || 1);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error al eliminar el usuario');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300';
      case 'customer':
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
              Usuarios
            </Typography>
            <Typography variant="body" color="muted" className="text-sm sm:text-base">
              Gestiona los usuarios del sistema ({pagination?.totalUsers || 0} total)
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
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 text-sm"
              />
            </div>
            
            <div className="w-full sm:w-48 lg:w-56">
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'Todos los roles' },
                  { value: 'admin', label: 'Administradores' },
                  { value: 'customer', label: 'Clientes' },
                ]}
                placeholder="Rol"
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

        {/* Lista de Usuarios - Mobile & Tablet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 w-full"
        >
          {loading ? (
            <div className="p-8 text-center rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <Typography variant="body" color="muted">
                Cargando usuarios...
              </Typography>
            </div>
          ) : (
            users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 w-full"
              >
                {/* Header del usuario */}
                <div className="flex justify-between items-start gap-3 mb-3 w-full">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-full flex-shrink-0">
                      <User className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Typography variant="h6" color="default" className="text-sm font-medium break-words">
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="muted" className="text-xs break-words">
                        ID: {user._id.slice(-8)}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                      <Typography variant="caption" color={user.role === 'admin' ? 'primary' : 'secondary'}>
                        {user.role}
                      </Typography>
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        user.isActive !== false ? 'paid' : 'failed'
                      )}`}
                    >
                      <Typography
                        variant="caption"
                        color={user.isActive !== false ? 'success' : 'error'}
                      >
                        {user.isActive !== false ? 'Activo' : 'Inactivo'}
                      </Typography>
                    </span>
                  </div>
                </div>

                {/* Información del usuario */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <Typography variant="body" color="muted" className="text-sm break-words">
                      {user.email}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <Typography variant="caption" color="muted" className="text-xs">
                      Registrado: {formatDate(user.createdAt)}
                    </Typography>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={user.isActive !== false ? UserX : UserCheck}
                    onClick={() => toggleUserStatus(user._id, user.isActive !== false)}
                    title={user.isActive !== false ? 'Desactivar usuario' : 'Activar usuario'}
                    className={`flex-1 text-xs ${
                      user.isActive !== false
                        ? 'text-error-500 hover:text-error-600'
                        : 'text-success-500 hover:text-success-600'
                    }`}
                    children={undefined}
                  />
                  
                  {user.role !== 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Trash2}
                      onClick={() => deleteUser(user._id)}
                      title="Eliminar usuario"
                      className="flex-1 text-xs text-error-500 hover:text-error-600"
                      children={undefined}
                    />
                  )}
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
                  Mostrando {users.length} de {pagination.totalUsers} usuarios
                </Typography>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchUsers(pagination.currentPage - 1)}
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
                    onClick={() => fetchUsers(pagination.currentPage + 1)}
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

export default UsersPage;