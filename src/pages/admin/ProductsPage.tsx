import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import api from '../../services/api';
import { ProductModal } from '../../components/admin/ProductModal';
import { getStatusColor } from '../../components/utils/statusUtils';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  category: string;
  images: string[];
  createdAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
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

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/products/categories');
        setCategories(['all', ...response.data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
      });

      const response = await api.get(`/admin/products?${params}`);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(1);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await api.delete(`/admin/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
      alert('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="py-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Productos
            </Typography>
            <Typography variant="body" color="muted">
              Gestiona tu inventario de productos ({pagination?.totalProducts || 0} total)
            </Typography>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            iconPosition="left"
            onClick={() => setIsModalOpen(true)}
          >
            Nuevo Producto
          </Button>
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
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categories.map((category) => ({
                value: category,
                label: category === 'all' ? 'Todas las categorías' : category,
              }))}
              placeholder="Seleccionar categoría"
              className="min-w-[200px]"
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

        {/* Tabla de Productos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          {loading ? (
            <div className="p-8 text-center">
              <Typography variant="body" color="muted">
                Cargando productos...
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
                          Producto
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Precio
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Stock
                        </Typography>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Typography variant="overline" color="muted">
                          Categoría
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
                    {products.map((product, index) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {product.images[0] && (
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-10 h-10 object-cover rounded"
                              />
                            )}
                            <div>
                              <Typography variant="h6" color="default">
                                {product.title}
                              </Typography>
                              <Typography variant="caption" color="muted" className="line-clamp-1">
                                {product.description}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Typography variant="body" color="default">
                            {product.currency} {product.price.toFixed(2)}
                          </Typography>
                        </td>
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                  product.stock > 10 ? 'paid' : 'failed'
                                )}`}
                              >
                                <Typography variant="caption" color={product.stock > 10 ? 'success' : 'error'}>
                                  {product.stock} unidades
                                </Typography>
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor('paid')}`}>
                                <Typography variant="caption" color="primary">
                                  {product.category}
                                </Typography>
                              </span>
                            </div>
                          </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={Edit}
                              onClick={() => handleEdit(product)}
                              title="Editar producto" children={undefined}                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={Trash2}
                              onClick={() => handleDelete(product._id)}
                              title="Eliminar producto"
                              className="text-error-500 hover:text-error-600" children={undefined}                            />
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
                      Mostrando {products.length} de {pagination.totalProducts} productos
                    </Typography>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchProducts(pagination.currentPage - 1)}
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
                        onClick={() => fetchProducts(pagination.currentPage + 1)}
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

        {/* Modal */}
        {isModalOpen && (
          <ProductModal
            product={editingProduct}
            onClose={handleModalClose}
            categories={categories}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProductsPage;
