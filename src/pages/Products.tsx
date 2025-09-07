import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Zap, Shield, Users, BarChart3, Search, Filter } from 'lucide-react';

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

const products = [
  {
    id: 1,
    name: 'Sistema POS Avanzado',
    price: '$2,999',
    category: 'Software',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 2,
    name: 'Router Empresarial Pro',
    price: '$899',
    category: 'Hardware',
    image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 3,
    name: 'Licencia Cloud Storage',
    price: '$199/mes',
    category: 'Cloud',
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: false,
  },
  {
    id: 4,
    name: 'Servidor Dedicado',
    price: '$1,299',
    category: 'Hardware',
    image: 'https://images.pexels.com/photos/325160/pexels-photo-325160.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 5,
    name: 'ERP Personalizado',
    price: '$4,999',
    category: 'Software',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 6,
    name: 'Consultoría DevOps',
    price: '$599/hora',
    category: 'Servicios',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
];

const categories = ['Todos', 'Software', 'Hardware', 'Cloud', 'Servicios'];

const ProductCard: React.FC<{
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  inStock: boolean;
}> = ({ name, price, category, image, inStock }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <Typography variant="h6" color="default" className="mb-2">
          {name}
        </Typography>
        <Typography variant="body" color="muted" className="mb-2">
          {category}
        </Typography>
        <Typography variant="h6" color="primary" className="mb-4">
          {price}
        </Typography>
        <Typography
          variant="caption"
          color={inStock ? 'success' : 'error'}
          className="mb-4"
        >
          {inStock ? 'En stock' : 'Agotado'}
        </Typography>
        <Button variant="primary" size="sm" className="w-full">
          Ver Detalles
        </Button>
      </div>
    </motion.div>
  );
};

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-20">
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

        {/* Features Section */}
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
              className="text-center p-6"
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

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-6 mb-12"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
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
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Typography variant="h3" color="default" className="mb-4">
              No se encontraron productos
            </Typography>
            <Typography variant="body" color="muted">
              Intenta cambiar los filtros o buscar con otros términos
            </Typography>
          </motion.div>
        )}

        {/* CTA Section */}
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
