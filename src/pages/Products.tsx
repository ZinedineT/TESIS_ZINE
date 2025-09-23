import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Search, Filter } from 'lucide-react';
import { ProductCard } from '../components/molecules/ProductCard';
import { useProducts } from '../contexts/ProductsContext';
import type { Product } from '../contexts/ProductsContext';

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
  const [image, setImage] = useState<File|null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loadingRec, setLoadingRec] = useState(false);
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [mainCategory, setMainCategory] = useState<string>('');
  const token = localStorage.getItem('token');

async function handleImageSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!image) return;
  setLoadingRec(true);
  const fd = new FormData();
  fd.append('image', image);
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ai/analyze-upload`, {
    method: 'POST',
    headers: {
    Authorization: `Bearer ${token}`,
  },
    body: fd
  });
  const data = await res.json();
  setRecommended(data.products || []);
  setSearchTerms(data.keywords || []); // ← GUARDAR TÉRMINOS
  setMainCategory(data.mainCategory || ''); // ← GUARDAR CATEGORÍA
  setLoadingRec(false);
}


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
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Typography variant="h1" color="default" className="mb-6">
            Catalogo de Productos
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg">
            Diseñados para optimizar
            y automatizar los procesos de tu empresa.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-6 mb-12 p-6 rounded-lg shadow-md"
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
        {/* --- Recomendación por imagen --- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-16 border-t border-gray-200 dark:border-gray-700 mb-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <Typography variant="h2" color="default" className="mb-4">
              ¿Prefieres buscar por imagen?
            </Typography>

            <form
              onSubmit={handleImageSubmit}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <input
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary-50 file:text-primary-700
                          hover:file:bg-primary-100"
              />
              <Button type="submit" variant="primary" size="lg">
                Buscar
              </Button>
            </form>

            {loadingRec && <p className="mt-4 text-gray-500">Analizando imagen…</p>}

            {recommended.length > 0 && (
              <div className="mt-8">
                <Typography variant="h3" className="mb-4">
                  {mainCategory 
                    ? `Productos recomendados de ${mainCategory}`
                    : 'Productos recomendados basados en tu imagen'
                  }
                </Typography>
                
                {/* MEJORAR INFORMACIÓN DE ANÁLISIS */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-4 rounded-lg mb-6">
                  <Typography variant="h4" className="font-semibold mb-3">
                    📊 Análisis de la imagen
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="body" className="font-semibold">Términos identificados:</Typography>
                      <Typography variant="body" color="muted">
                        {searchTerms.join(', ') || 'No se identificaron términos específicos'}
                      </Typography>
                    </div>
                    
                    {mainCategory && (
                      <div>
                        <Typography variant="body" className="font-semibold">Categoría detectada:</Typography>
                        <Typography variant="body" color="muted" className="text-green-600 dark:text-green-400">
                          ✅ {mainCategory}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommended.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};
