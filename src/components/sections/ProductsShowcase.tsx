import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../molecules/ProductCard';
import { Typography } from '../atoms/Typography';
// import { Button } from '../atoms/Button';
// import { Sparkles } from 'lucide-react';

const products = [
  {
    title: 'CRM Empresarial',
    description: 'Sistema completo de gestión de clientes con automatización de ventas.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 'Desde €299/mes',
    features: ['Gestión de contactos', 'Automatización de email', 'Reportes avanzados'],
  },
  {
    title: 'Plataforma E-commerce',
    description: 'Tienda online completa con gestión de inventario y pagos.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 'Desde €199/mes',
    features: ['Catálogo de productos', 'Pagos seguros', 'Analytics'],
  },
  {
    title: 'Dashboard Analytics',
    description: 'Visualización de datos en tiempo real para toma de decisiones.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 'Desde €149/mes',
    features: ['Métricas en tiempo real', 'Reportes personalizados', 'Integración API'],
  },
];

export const ProductsShowcase: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 h-full"
        >
          <Typography variant="h2" color="default" className="mb-6">
            Productos Destacados
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg mb-8">
            Soluciones probadas que han transformado cientos de empresas.
          </Typography>
        </motion.div>

        {/* AI Recommendations Placeholder */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 p-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border border-primary-200 dark:border-primary-800"
        >
          <div className="text-center">
            <Sparkles className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <Typography variant="h4" color="primary" className="mb-4">
              Recomendaciones Inteligentes
            </Typography>
            <Typography variant="body" color="muted" className="mb-6 max-w-2xl mx-auto">
              Próximamente nuestro asistente IA analizará tus necesidades y te recomendará 
              las mejores soluciones personalizadas para tu empresa.
            </Typography>
            <Button variant="outline" size="lg">
              Notificarme cuando esté listo
            </Button>
          </div>
        </motion.div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className='h-full'
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};