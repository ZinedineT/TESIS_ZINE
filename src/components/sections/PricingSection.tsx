import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, ArrowRight } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import pdfFile from '../../assets/pdf/planes-cistcor.pdf'; // Adjust the path as needed

const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState('mensual');

  const plans = {
    mensual: [
      {
        name: 'Emprendedor',
        price: 'S/ 49',
        priceBefore: 'S/ 59',
        savings: 'Ahorras S/ 10',
        features: [
          '300 Comprobantes/mes',
          'Hasta 2 Usuarios',
          '1 Establecimiento',
          '1 Almacén',
          'Inventario básico',
          'Reportes básicos',
          'Soporte personalizado'
        ],
        popular: false
      },
      {
        name: 'Estándar',
        price: 'S/ 97',
        priceBefore: 'S/ 117',
        savings: 'Ahorras S/ 20',
        features: [
          '1500 Comprobantes/mes',
          'Hasta 5 Usuarios',
          '2 Establecimientos',
          '2 Almacenes',
          'Inventario avanzado',
          'Control de compras',
          'Punto de venta',
          'Reportes avanzados',
          'Incluye OSE',
          'Soporte personalizado'
        ],
        popular: true
      },
      {
        name: 'Profesional',
        price: 'S/ 147',
        priceBefore: 'S/ 177',
        savings: 'Ahorras S/ 30',
        features: [
          '4000 Comprobantes/mes',
          'Hasta 10 Usuarios',
          '4 Establecimientos',
          '4 Almacenes',
          'Inventario avanzado',
          'Control de compras',
          'Punto de venta',
          'Finanzas',
          'Reportes avanzados',
          'Incluye OSE',
          'Soporte personalizado'
        ],
        popular: false
      }
    ],
    semestral: [
      {
        name: 'Emprendedor',
        price: 'S/ 274.40',
        priceBefore: 'S/ 294.00',
        savings: 'Ahorras S/ 16.90',
        features: [
          '300 Comprobantes/mes',
          'Hasta 2 Usuarios',
          '1 Establecimiento',
          '1 Almacén',
          'Inventario básico',
          'Reportes básicos',
          'Soporte personalizado'
        ],
        popular: false
      },
      {
        name: 'Estándar',
        price: 'S/ 543.20',
        priceBefore: 'S/ 582',
        savings: 'Ahorras S/ 38.80',
        features: [
          '1500 Comprobantes/mes',
          'Hasta 5 Usuarios',
          '2 Establecimientos',
          '2 Almacenes',
          'Inventario avanzado',
          'Control de compras',
          'Punto de venta',
          'Reportes avanzados',
          'Incluye OSE',
          'Soporte personalizado'
        ],
        popular: true
      },
      {
        name: 'Profesional',
        price: 'S/ 823.20',
        priceBefore: 'S/ 882',
        savings: 'Ahorras S/ 58.80',
        features: [
          '4000 Comprobantes/mes',
          'Hasta 10 Usuarios',
          '4 Establecimientos',
          '4 Almacenes',
          'Inventario avanzado',
          'Control de compras',
          'Punto de venta',
          'Finanzas',
          'Reportes avanzados',
          'Incluye OSE',
          'Soporte personalizado'
        ],
        popular: false
      }
    ],
    anual: [
      {
        name: 'Emprendedor',
        price: 'S/ 539',
        priceBefore: 'S/ 588',
        savings: 'Ahorras S/ 49',
        features: [
          '300 Comprobantes/mes',
          'Hasta 2 Usuarios',
          '1 Establecimiento',
          '1 Almacén',
          'Inventario básico',
          'Reportes básicos',
          'Soporte personalizado'
        ],
        popular: false
      },
      {
        name: 'Estándar',
        price: 'S/ 1067',
        priceBefore: 'S/ 1164',
        savings: 'Ahorras S/ 97',
        features: [
          '1500 Comprobantes/mes',
          'Hasta 5 Usuarios',
          '2 Establecimientos',
          '2 Almacenes',
          'Inventario avanzado',
          'Control de compras',
          'Punto de venta',
          'Reportes avanzados',
          'Incluye OSE',
          'Soporte personalizado'
        ],
        popular: true
      },
      {
        name: 'Profesional',
        price: 'S/ 1617',
        priceBefore: 'S/ 1764',
        savings: 'Ahorras S/ 147',
        features: [
          '4000 Comprobantes/mes',
          'Hasta 10 Usuarios',
          '4 Establecimientos',
          '4 Almacenes',
          'Inventario avanzado',
          'Control de compras',
          'Punto de venta',
          'Finanzas',
          'Reportes avanzados',
          'Incluye OSE',
          'Soporte personalizado'
        ],
        popular: false
      }
    ]
  };

  const currentPlans = plans[billingCycle as keyof typeof plans];

  return (
    <section className="relative overflow-hidden">
      {/* Header con gradiente */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" className="text-primary mb-4">
              Impulsa tu Mype con tu plan de <br /> Cistcor Facturación Electrónica
            </Typography>
            <Typography variant="body" className="text-primary mb-2">
              Prueba hoy mismo el plan que se adapta a tus necesidades.
            </Typography>
            <Typography variant="body" className="text-primary">
              Sin contratos de permanencia ni trámites engorrosos.
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <ChevronDown className="h-12 w-12 text-primary-300 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </div>

      {/* Selector de ciclo de facturación */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="inline-flex rounded-md shadow-sm bg-white dark:bg-gray-700 p-1">
              {['mensual', 'semestral', 'anual'].map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    billingCycle === cycle
                      ? 'bg-gradient-to-b from-primary-600 to-primary-800 text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {cycle === 'mensual' && 'Pago mensual'}
                  {cycle === 'semestral' && 'Pago semestral'}
                  {cycle === 'anual' && 'Pago anual'}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Planes de precios */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {currentPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className={`relative h-full flex flex-col ${
                  plan.popular
                    ? 'ring-2 ring-primary-500 transform scale-105 shadow-xl'
                    : 'shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-primary-600 to-primary-800 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  {/* Header del plan */}
                  <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
                    <Typography variant="h5" className="text-gray-900 dark:text-white mb-2 uppercase">
                      {plan.name}
                    </Typography>
                    
                    <div className="flex items-baseline justify-center">
                      <Typography variant="h3" className="text-primary-600 dark:text-primary-500 mr-2">
                        {plan.price}
                      </Typography>
                      <Typography variant="body" className="text-gray-500 dark:text-gray-400 text-sm">
                        + IGV
                      </Typography>
                    </div>
                    
                    <Typography variant="body" className="text-error-500 line-through mt-1">
                      {plan.priceBefore}
                    </Typography>
                    
                    <Typography variant="body" className="text-error-600 dark:text-success-600 mt-1 font-semibold">
                      {plan.savings}
                    </Typography>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                      <a
                        href="register.php"
                        className="inline-block border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 rounded-lg px-6 py-2 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      >
                        Prueba Gratis
                      </a>
                    </motion.div>
                  </div>
                  
                  {/* Características - Contenedor con scroll si es necesario */}
                  <div className="py-6 flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                          <Typography variant="body" className="text-gray-600 dark:text-gray-300">
                            {feature}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Botón de conocer más */}
                <div className="p-4 text-center">
                  <motion.a
                    href={pdfFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center bg-gradient-to-b from-primary-600 to-primary-800 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors w-full"
                  >
                    Conocer más
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;