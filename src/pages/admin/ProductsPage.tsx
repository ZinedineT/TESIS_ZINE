import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Filter, MoreVertical } from 'lucide-react';
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

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);

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
    setMobileMenuOpen(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    fetchProducts();
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
              Productos
            </Typography>
            <Typography variant="body" color="muted" className="text-sm sm:text-base">
              Gestiona tu inventario de productos ({pagination?.totalProducts || 0} total)
            </Typography>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            iconPosition="left"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto min-w-[140px] mt-2 sm:mt-0"
          >
            <span className="hidden sm:inline">Nuevo Producto</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
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
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 text-sm"
              />
            </div>

            <div className="w-full sm:w-48 lg:w-56">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={categories.map((category) => ({
                  value: category,
                  label: category === 'all' ? 'Todas las categorías' : category,
                }))}
                placeholder="Categorías"
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
              <span className="hidden sm:inline">Filtrar</span>
              <span className="sm:hidden">Buscar</span>
            </Button>
          </form>
        </motion.div>

        {/* Lista de Productos - Mobile & Tablet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 w-full"
        >
          {loading ? (
            <div className="p-8 text-center rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <Typography variant="body" color="muted">
                Cargando productos...
              </Typography>
            </div>
          ) : (
            products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 w-full"
              >
                <div className="flex justify-between items-start gap-3 mb-3 w-full">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {product.images[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <Typography
                        variant="h6"
                        color="default"
                        className="text-sm font-medium break-words"
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="muted"
                        className="text-xs line-clamp-2 break-words"
                      >
                        {product.description}
                      </Typography>
                    </div>
                  </div>
                  <div className="relative flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={MoreVertical}
                      onClick={() => setMobileMenuOpen(mobileMenuOpen === product._id ? null : product._id)}
                      children={undefined}
                    />
                    {mobileMenuOpen === product._id && (
                      <div className="absolute right-0 top-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10 min-w-[120px]">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-t-lg"
                        >
                          <Edit size={14} />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-lg"
                        >
                          <Trash2 size={14} />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs w-full">
                  <div className="space-y-1">
                    <Typography variant="caption" color="muted" className="block">
                      Precio
                    </Typography>
                    <Typography variant="body" color="default" className="font-medium text-sm">
                      {product.currency} {product.price.toFixed(2)}
                    </Typography>
                  </div>
                  <div className="space-y-1">
                    <Typography variant="caption" color="muted" className="block">
                      Stock
                    </Typography>
                    <span
                      className={`px-2 py-1 rounded-full inline-block ${
                        getStatusColor(product.stock > 10 ? 'paid' : 'failed')
                      }`}
                    >
                      <Typography
                        variant="caption"
                        color={product.stock > 10 ? 'success' : 'error'}
                        className="text-xs leading-none"
                      >
                        {product.stock} unidades
                      </Typography>
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Typography variant="caption" color="muted" className="block">
                      Categoría
                    </Typography>
                    <span className={`px-2 py-1 rounded-full inline-block ${getStatusColor('paid')}`}>
                      <Typography variant="caption" color="primary" className="text-xs leading-none">
                        {product.category}
                      </Typography>
                    </span>
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
                  Mostrando {products.length} de {pagination.totalProducts} productos
                </Typography>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchProducts(pagination.currentPage - 1)}
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
                    onClick={() => fetchProducts(pagination.currentPage + 1)}
                    disabled={!pagination.hasNext}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </motion.div>
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
