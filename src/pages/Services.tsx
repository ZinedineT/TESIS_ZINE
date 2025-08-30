import React from 'react';
import { motion } from 'framer-motion';
import { ServicesGrid } from '../components/organisms/ServicesGrid';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { Calendar } from 'lucide-react';

export const Services: React.FC = () => {
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
            Servicios Profesionales
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg mb-8">
            Transformamos tu visión en realidad con nuestro equipo de expertos y las tecnologías más avanzadas.
          </Typography>
          <Button 
            variant="primary" 
            size="lg"
            icon={Calendar}
            iconPosition="right"
          >
            Agendar Consulta Gratuita
          </Button>
        </motion.div>
      </div>
      
      <ServicesGrid />
      
      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-20 bg-primary-50 dark:bg-primary-900/20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Typography variant="h2" color="default" className="mb-6">
            ¿Necesitas una solución personalizada?
          </Typography>
          <Typography variant="body" color="muted" className="mb-8 text-lg">
            Nuestro equipo de expertos puede crear la solución perfecta para tus necesidades específicas.
          </Typography>
          <Button variant="primary" size="lg">
            Solicitar Cotización
          </Button>
        </div>
      </motion.section>
    </div>
  );
};