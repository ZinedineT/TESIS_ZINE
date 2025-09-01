import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import cistcorImage from '../../assets/cistcorfact_01.jpg'; // Importación correcta

export const ServicesGrid: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full mx-auto font-open-sans sm:max-w-xl xl:max-w-full"
          >
            <div className="text-4xl font-bold leading-none md:text-[40px] xl:pr-12">
              <Typography variant="h2" color="default" className="mb-6">
                Factura más fácil y rápido con{' '}
                <span className="text-primary-600">Cistcor</span>
              </Typography>
            </div>
            <Typography variant="body" color="muted" className="mt-10 text-lg xl:text-xl xl:pr-32">
              La emisión de facturas electrónicas es más fácil con nuestro sistema.
            </Typography>
            <ul className="mt-8 space-y-4">
              <li className="flex items-baseline">
                <Check className="mr-2 text-primary-600 flex-shrink-0" size={20} />
                <Typography variant="body" color="muted">
                  Conoce tu inventario al instante.
                </Typography>
              </li>
              <li className="flex items-baseline">
                <Check className="mr-2 text-primary-600 flex-shrink-0" size={20} />
                <Typography variant="body" color="muted">
                  Vende en solo 3 clicks.
                </Typography>
              </li>
              <li className="flex items-baseline">
                <Check className="mr-2 text-primary-600 flex-shrink-0" size={20} />
                <Typography variant="body" color="muted">
                  Accede desde cualquier dispositivo.
                </Typography>
              </li>
              <li className="flex items-baseline">
                <Check className="mr-2 text-primary-600 flex-shrink-0" size={20} />
                <Typography variant="body" color="muted">
                  Obtén tu reporte de ventas de inmediato.
                </Typography>
              </li>
            </ul>
            <div className="pt-10">
              <a 
                className="inline-block px-8 py-3 text-white bg-primary-600 hover:bg-primary-700 rounded-md font-medium transition-colors duration-200" 
                href="register.php"
              >
                PRUEBA GRATIS
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center w-full mx-auto sm:max-w-lg xl:max-w-full"
          >
            <img 
              className="rounded-lg shadow-lg max-w-full h-auto" 
              src={cistcorImage} // Usando la variable importada
              alt="Sistema de facturación Cistcor" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};