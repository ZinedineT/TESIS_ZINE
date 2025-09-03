import React from 'react';
import { motion } from 'framer-motion';
// import { ServicesGrid } from '../components/sections/ServicesGrid';
import {ControlSection} from '../components/sections/ControlSection'
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';

export const Services: React.FC = () => {
  return (
    <div className="py-20">
      {/*ControlSection*/}
      <ControlSection/>
      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-0"
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