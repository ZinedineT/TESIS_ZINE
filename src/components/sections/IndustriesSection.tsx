// components/sections/GrowingIndustriesSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import IndustryImage from '../../assets/rubros.png'; // Ajusta la ruta según donde coloques la imagen

const industries = [
  { name: 'MINIMARKET', icon: '🛒' },
  { name: 'EDUCACION', icon: '🎓' },
  { name: 'BOUTIQUE', icon: '👗' },
  { name: 'CARNICERIA', icon: '🥩' },
  { name: 'VETERINARIA', icon: '🐾' },
  { name: 'CAFETERIA', icon: '☕' },
  { name: 'LIBRERIA', icon: '📚' },
  { name: 'RESTAURANTE', icon: '🍽️' },
  { name: 'TURISMO', icon: '🏖️' }
];

export const IndustriesSection: React.FC = () => {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-4">
            <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <Typography variant="h2" color="default" className="mb-4">
            CISTCORFACT CRECIENDO EN <span className="text-primary-600">+25 RUBROS</span>
          </Typography>
          <Typography variant="body" color="muted" className="max-w-2xl mx-auto">
            Nuestra solución se adapta a una amplia variedad de industrias, proporcionando herramientas especializadas para cada sector.
          </Typography>
        </motion.div>

        {/* Contenido principal con imagen a la izquierda */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          {/* Columna izquierda - Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:w-2/5"
          >
            <div className="relative">
              <img 
                src={IndustryImage} 
                alt="CISTCORFACT en múltiples rubros" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              {/* Elemento decorativo */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-primary-500/10 rounded-full z-0"></div>
            </div>
          </motion.div>

          {/* Columna derecha - Grid de rubros */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-primary-200 dark:group-hover:border-primary-500/30">
                    <div className="text-2xl mb-2">{industry.icon}</div>
                    <Typography variant="h5" color="default" className="font-semibold text-sm">
                      {industry.name}
                    </Typography>
                  </div>
                </motion.div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};