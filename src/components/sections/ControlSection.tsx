// components/sections/ControlSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  CreditCard, 
  Package, 
  BarChart3, 
  DollarSign, 
  ShoppingBag,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Typography } from '../atoms/Typography';
import ControlImage from '../../assets/hero1.png'; // Ajusta la ruta según donde coloques la imagen

const features = [
  {
    title: 'Sección Ventas! 📈',
    description: '',
    icon: ShoppingCart,
    color: 'bg-blue-500'
  },
  {
    title: 'Sección POS! 💳',
    description: '',
    icon: CreditCard,
    color: 'bg-green-500'
  },
  {
    title: 'Sección Inventario! 📦',
    description: '',
    icon: Package,
    color: 'bg-purple-500'
  },
  {
    title: 'Sección Contabilidad! 📊',
    description: '',
    icon: BarChart3,
    color: 'bg-orange-500'
  },
  {
    title: 'Sección Finanzas! 💰',
    description: '',
    icon: DollarSign,
    color: 'bg-red-500'
  },
  {
    title: 'Sección Productos/Servicios! 🛒',
    description: '',
    icon: ShoppingBag,
    color: 'bg-indigo-500'
  }
];

export const ControlSection: React.FC = () => {
  // Dividimos las características en dos grupos: izquierda y derecha
  const leftFeatures = features.slice(0, 3);
  const rightFeatures = features.slice(3, 6);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography variant="h2" color="default" className="mb-6">
            CON <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-900">CISTCORFACT</span> TU TIENES EL CONTROL...
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg">
            Gestiona todas las áreas de tu negocio con nuestra plataforma integral diseñada para el éxito empresarial
          </Typography>
        </motion.div>

        {/* Features Grid with Central Image */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 mb-16 items-center">
          {/* Left Features - 3 cards */}
          <div className="lg:col-span-4 space-y-8">
            {leftFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl ${feature.color} text-white mr-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <Typography variant="h4" color="default" className="font-bold">
                      {feature.title}
                    </Typography>
                  </div>

                  <Typography variant="body" color="muted" className="mb-4">
                    {feature.description}
                  </Typography>

                  <div className="space-y-2">
                    {feature.title === 'Sección Ventas! 📈' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Comprobantes electrónicos</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Seguimiento de transacciones</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Gestión de cotizaciones</span>
                        </div>
                      </>
                    )}

                    {feature.title === 'Sección POS! 💳' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Puntos de venta</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Ventas rápidas</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Caja chica</span>
                        </div>
                      </>
                    )}

                    {feature.title === 'Sección Inventario! 📦' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Movimientos de stock</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Traslados y devoluciones</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Reportes detallados</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end mt-4">
                    <div className="text-primary-500 text-2xl"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Central Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-3 flex justify-center"
          >
            <div className="relative">
              <img 
                src={ControlImage} 
                alt="Control total con CistcorFact" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
              />
              {/* Efecto de brillo alrededor de la imagen */}
              <div className="absolute inset-0 bg-primary-500/10 rounded-2xl blur-xl -z-10 transform scale-105"></div>
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-b from-primary-600 to-primary-800 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center mx-auto hover:bg-gray-100 transition-colors"
            >
              Quiero el control!
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
            </div>
          </motion.div>

          {/* Right Features - 3 cards */}
          <div className="lg:col-span-4 space-y-8">
            {rightFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className=" rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl ${feature.color} text-white mr-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <Typography variant="h4" color="default" className="font-bold">
                      {feature.title}
                    </Typography>
                  </div>

                  <Typography variant="body" color="muted" className="mb-4">
                    {feature.description}
                  </Typography>

                  <div className="space-y-2">
                    {feature.title === 'Sección Contabilidad! 📊' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Exportación de reportes</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Libro Mayor</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Integración SIRE</span>
                        </div>
                      </>
                    )}

                    {feature.title === 'Sección Finanzas! 💰' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Gestión de transacciones</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Control de ingresos/pagos</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Flujo de caja</span>
                        </div>
                      </>
                    )}

                    {feature.title === 'Sección Productos/Servicios! 🛒' && (
                      <>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Gestión de productos</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Packs y promociones</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-black dark:text-white">Categorías y marcas</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end mt-4">
                    <div className="text-primary-500 text-2xl"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};