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

// ✅ PRODUCTOS ACTUALIZADOS con los datos de tu Excel
const products = [
  // IMPRESORAS TERMICAS
  {
    id: 1,
    name: 'Impresora térmica 3NSTAR RPT004 - 80MM - USB Y Ethernet',
    price: 'S/ 495.00',
    category: 'Impresoras',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 2,
    name: 'Impresora térmica CBX POS-89E - 80MM - USB y Ethernet',
    price: 'S/ 426.00',
    category: 'Impresoras',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 3,
    name: 'Impresora de Código de Barras ZEBRA - ZD220 - 1D Y 2D - USB',
    price: 'S/ 1,489.00',
    category: 'Impresoras',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },

  // LECTORES DE CÓDIGO DE BARRAS
  {
    id: 4,
    name: 'Lector De Código De Barras 3nSTAR - SC050 - 1D - USB - Laser C/Base',
    price: 'S/ 169.00',
    category: 'Lectores',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 5,
    name: 'Lector De Código De Barras POS-D - PRO SCAN - 1D/2D - USB - Laser S/Base',
    price: 'S/ 235.00',
    category: 'Lectores',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 6,
    name: 'Lector De Código De Barras CBX - I-1915 - 1D - USB - Laser C/Base',
    price: 'S/ 145.00',
    category: 'Lectores',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 7,
    name: 'Lector De Código De Barras 3nSTAR - SCI150-1 - 1D - USB - Imager/Base',
    price: 'S/ 218.00',
    category: 'Lectores',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 8,
    name: 'Lector De Código De Barras 3nSTAR - SC100-1 - 1D - USB - Laser C/Base',
    price: 'S/ 239.00',
    category: 'Lectores',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },

  // GAVETAS CAJA DE DINERO
  {
    id: 9,
    name: 'Gaveta de dinero POS-D CASH330 - 33x35.5x10cm - 4 compartimientos',
    price: 'S/ 231.00',
    category: 'Gavetas',
    image: 'https://images.pexels.com/photos/50987/money-cash-currency-coin-50987.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 10,
    name: 'Gaveta de dinero 3NSTAR CD350 LARGE - 41x42x10CM - 5 compartimientos',
    price: 'S/ 312.00',
    category: 'Gavetas',
    image: 'https://images.pexels.com/photos/50987/money-cash-currency-coin-50987.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },

  // SUMINISTROS
  {
    id: 11,
    name: 'Papel Contómetro Térmico 80mm x 80mm - Caja de 50',
    price: 'S/ 315.00',
    category: 'Suministros',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 12,
    name: 'Papel Contómetro Térmico 80mm x 80mm - Caja de 20',
    price: 'S/ 137.00',
    category: 'Suministros',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 13,
    name: 'Papel Contómetro Térmico 80mm x 80mm - Caja de 10',
    price: 'S/ 71.00',
    category: 'Suministros',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 14,
    name: 'Etiquetas de papel TT - Rollo x 3000 - 5cm x 2.5cm',
    price: 'S/ 51.00',
    category: 'Suministros',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 15,
    name: 'Etiquetas de papel TT- Rollo x 6000 - 3cm x 2cm',
    price: 'S/ 59.00',
    category: 'Suministros',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 16,
    name: 'Cinta de cera - 110mm - 74mt.',
    price: 'S/ 22.00',
    category: 'Suministros',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },

  // COMPUTADORAS
  {
    id: 17,
    name: 'Computadora Mini PC para punto de venta HP PRODESK 600 G5 + Monitor 19" + Teclado + Mouse + Estabilizador',
    price: 'S/ 1,900.00',
    category: 'Computadoras',
    image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },

  // PACKS
  {
    id: 18,
    name: 'Pack: Impresora CBX POS-89E + Gaveta CASH330',
    price: 'S/ 649.00',
    category: 'Packs',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 19,
    name: 'Pack: Impresora 3NSTAR RPT004 + Gaveta CASH330',
    price: 'S/ 719.00',
    category: 'Packs',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 20,
    name: 'Pack: Impresora CBX POS-89E + Gaveta CASH330 + Lector SC050',
    price: 'S/ 815.00',
    category: 'Packs',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 21,
    name: 'Pack: Impresora 3NSTAR RPT004 + Gaveta CASH330 + Lector SC050',
    price: 'S/ 885.00',
    category: 'Packs',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 22,
    name: 'Pack: Gaveta CASH330 + Lector SC050',
    price: 'S/ 390.00',
    category: 'Packs',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 23,
    name: 'Pack: Gaveta CASH330 + Lector PRO SCAN',
    price: 'S/ 456.00',
    category: 'Packs',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
  {
    id: 24,
    name: 'Pack Completo: Computadora + Impresora + Gaveta + Lector',
    price: 'S/ 2,699.00',
    category: 'Packs',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    inStock: true,
  },
];

const categories = ['Todos', 'Impresoras', 'Lectores', 'Gavetas','Computadoras', 'Suministros','Packs'];

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
