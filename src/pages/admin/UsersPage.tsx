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
              Usuarios
            </Typography>
            <Typography variant="body" color="muted">
              Gestiona los usuarios del sistema ({pagination?.totalUsers || 0} total)
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
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Todos los roles' },
                { value: 'admin', label: 'Administradores' },
                { value: 'customer', label: 'Clientes' },
              ]}
              placeholder="Seleccionar rol"
              className="min-w-[200px]"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={Filter}
              iconPosition="left"
            >
              Filtrar
            </Button>
          </form>
        </motion.div>

        {/* Tabla de Usuarios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          {loading ? (
            <div className="p-8 text-center">
              <Typography variant="body" color="muted">
                Cargando usuarios...
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
                          Usuario
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Email
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Rol
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Estado
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Fecha Registro
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
                    {users.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full">
                              <User className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                            </div>
                            <div>
                              <Typography variant="h6" color="default">
                                {user.name}
                              </Typography>
                              <Typography variant="caption" color="muted">
                                ID: {user._id.slice(-8)}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <Typography variant="body" color="muted">
                              {user.email}
                            </Typography>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                              <Typography variant="caption" color={user.role === 'admin' ? 'primary' : 'secondary'}>
                                {user.role}
                              </Typography>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
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
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <Typography variant="caption" color="muted">
                              {formatDate(user.createdAt)}
                            </Typography>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={user.isActive !== false ? UserX : UserCheck}
                              onClick={() => toggleUserStatus(user._id, user.isActive !== false)}
                              title={user.isActive !== false ? 'Desactivar usuario' : 'Activar usuario'}
                              className={user.isActive !== false
                                ? 'text-error-500 hover:text-error-600'
                                : 'text-success-500 hover:text-success-600'} children={undefined}                            />
                            {user.role !== 'admin' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={Trash2}
                                onClick={() => deleteUser(user._id)}
                                title="Eliminar usuario"
                                className="text-error-500 hover:text-error-600" children={undefined}                              />
                            )}
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
                      Mostrando {users.length} de {pagination.totalUsers} usuarios
                    </Typography>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchUsers(pagination.currentPage - 1)}
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
                        onClick={() => fetchUsers(pagination.currentPage + 1)}
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

export default UsersPage;