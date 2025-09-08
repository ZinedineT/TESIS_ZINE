// components/sections/WebDesignSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  // Code, 
  // Palette, 
  // Smartphone, 
  // Zap, 
  // Search, 
  // Shield,
  CheckCircle,
  ArrowRight,
  Globe,
  Cpu
} from 'lucide-react';
import { Typography } from '../atoms/Typography';
import WebDesignImage from '../../assets/diseño.png'; // Ajusta la ruta según donde coloques la imagen

// const features = [
//   {
//     title: 'Diseño Responsive',
//     description: 'Sitios que se adaptan perfectamente a todos los dispositivos',
//     icon: Smartphone,
//     color: 'from-blue-500 to-blue-700'
//   },
//   {
//     title: 'UI/UX Moderno',
//     description: 'Interfaces intuitivas y experiencias de usuario excepcionales',
//     icon: Palette,
//     color: 'from-green-500 to-green-700'
//   },
//   {
//     title: 'Desarrollo Frontend',
//     description: 'Código limpio y tecnologías modernas para un rendimiento óptimo',
//     icon: Code,
//     color: 'from-purple-500 to-purple-700'
//   },
//   {
//     title: 'Optimización SEO',
//     description: 'Mayor visibilidad en motores de búsqueda y más tráfico orgánico',
//     icon: Search,
//     color: 'from-orange-500 to-orange-700'
//   },
//   {
//     title: 'Alto Rendimiento',
//     description: 'Sitios ultrarrápidos que retienen a tus visitantes',
//     icon: Zap,
//     color: 'from-red-500 to-red-700'
//   },
//   {
//     title: 'Seguridad Web',
//     description: 'Protección avanzada para tu sitio y datos de usuarios',
//     icon: Shield,
//     color: 'from-indigo-500 to-indigo-700'
//   }
// ];

export const WebDesignSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
            <Globe className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <Typography variant="h2" color="default" className="mb-6">
            Diseño Web que <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-900">Convierte</span> 
          </Typography>
        </motion.div>

        {/* Contenido principal */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Columna izquierda - Texto y características */}
          <div className="lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Typography variant="h3" color="default" className="mb-6">
                Soluciones web a medida para impulsar tu negocio
              </Typography>
              <Typography variant="body" color="muted" className="mb-8 text-lg">
                Desarrollamos sitios web modernos, funcionales y atractivos que reflejan la esencia de tu marca y te ayudan a alcanzar tus objetivos comerciales.
              </Typography>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-black dark:text-white">Diseño personalizado</span>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-black dark:text-white">Entrega rápida</span>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-black dark:text-white">Soporte continuo</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center mx-auto lg:mx-0 transition-all duration-300 shadow-lg"
              >
                Solicitar presupuesto
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
          
          {/* Columna central - Imagen con efecto visual */}
          <div className="lg:w-3/5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={WebDesignImage} 
                  alt="Diseño web profesional" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Elementos decorativos alrededor de la imagen */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-500/10 rounded-xl rotate-12 z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-400/10 rounded-xl -rotate-12 z-0"></div>
              
              {/* Efecto de tarjeta flotante */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -right-8 bottom-16 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg z-20"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                    <Cpu className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">+87%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mejor imagen</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
      </div>
    </section>
  );
};