import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium">
              <Sparkles size={16} />
              Innovación Tecnológica
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Typography variant="h1" color="default" className="mb-6">
              Transformamos tu empresa con
              <span className="text-primary-500 block">
                soluciones tecnológicas
              </span>
            </Typography>
            <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg">
              Ofrecemos servicios integrales de consultoría, desarrollo y automatización 
              para llevar tu negocio al siguiente nivel con las mejores prácticas de la industria.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              variant="primary" 
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              Descubre Nuestros Servicios
            </Button>
            <Button variant="outline" size="lg">
              Ver Productos
            </Button>
          </motion.div>

          {/* AI Assistant Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800 max-w-md mx-auto"
          >
            <Typography variant="h6" color="primary" className="mb-2">
              🤖 Asistente IA Próximamente
            </Typography>
            <Typography variant="caption" color="muted">
              Estamos preparando un asistente inteligente para ayudarte a encontrar las mejores soluciones.
            </Typography>
          </motion.div>
        </div>
      </div>
    </section>
  );
};