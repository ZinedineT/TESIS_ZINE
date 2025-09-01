import React from 'react';
import { motion } from 'framer-motion';
import { ProductsShowcase } from '../components/sections/ProductsShowcase';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { Zap, Shield, Users, BarChart3 } from 'lucide-react';

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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
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
      </div>

      <ProductsShowcase />

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-20 bg-gray-50 dark:bg-gray-900/50"
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
  );
};