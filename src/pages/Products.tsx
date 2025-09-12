import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Zap, Shield, Users, BarChart3, Search, Filter } from 'lucide-react';
import { ProductCard } from '../components/molecules/ProductCard';
import { useProducts } from '../contexts/ProductsContext';

const features = [
  {
    title: 'Rendimiento',
    description: 'Optimizado para máxima velocidad y eficiencia',
    icon: Zap,
  },
  {
    title: 'Seguridad',
    description: 'Protección de datos con los más altos estándares',
    icon: Shield,
  },
  {
    title: 'Escalabilidad',
    description: 'Crece con tu empresa sin limitaciones',
    icon: Users,
  },
  {
    title: 'Analytics',
    description: 'Insights profundos para tomar mejores decisiones',
    icon: BarChart3,
  },
];

export const Products: React.FC = () => {
  const {
    products,
    loading,
    initialLoading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    totalProducts,
    setCurrentPage,
  } = useProducts();
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('newest');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'price':
        return a.price - b.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <Typography variant="h3" color="error" className="mb-4">
            Error al cargar productos
          </Typography>
          <Typography variant="body" color="muted">
            {error}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Typography variant="h1" color="default" className="mb-6">
            Productos y Soluciones
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg">
            Descubre nuestro catálogo completo de productos diseñados para optimizar
            y automatizar los procesos de tu empresa.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-800/30 mb-4">
                <feature.icon className="h-8 w-8 text-primary-500" />
              </div>
              <Typography variant="h6" color="default" className="mb-2">
                {feature.title}
              </Typography>
              <Typography variant="caption" color="muted">
                {feature.description}
              </Typography>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-6 mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="flex-1 relative min-w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Buscar productos (ej. Papel, Impresora)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 py-2 text-base"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</span>
            <select
              value={sortBy}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="newest">Más recientes</option>
              <option value="name">Nombre (A-Z)</option>
              <option value="price">Precio (Menor a Mayor)</option>
            </select>
          </div>
        </motion.div>

        {loading && sortedProducts.length > 0 && (
          <div className="text-center mb-4">
            <Typography variant="body" color="muted">
              Buscando productos...
            </Typography>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20"
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <Typography variant="h3" color="default" className="mb-4">
              No se encontraron productos
            </Typography>
            <Typography variant="body" color="muted">
              Intenta cambiar los filtros o buscar con otros términos
            </Typography>
          </motion.div>
        )}

        {sortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-4 mb-8"
          >
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </Button>
            <Typography variant="body" color="muted">
              Página {currentPage} de {totalPages}
            </Typography>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </Button>
          </motion.div>
        )}

        {sortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-gray-600 dark:text-gray-400 mb-8"
          >
            <Typography variant="body" color="muted">
              Mostrando {sortedProducts.length} de {totalProducts} productos
            </Typography>
          </motion.div>
        )}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Typography variant="h2" color="default" className="mb-6">
              ¿No encuentras lo que buscas?
            </Typography>
            <Typography variant="body" color="muted" className="mb-8 text-lg">
              Creamos soluciones personalizadas adaptadas a las necesidades específicas de tu empresa.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Consulta Personalizada
              </Button>
              <Button variant="outline" size="lg">
                Ver Demo
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
