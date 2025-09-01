import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Send, 
  FileText, 
  Package, 
  Play,
  Pause
} from 'lucide-react';
import { Typography } from '../atoms/Typography';

// Importa tus imágenes/GIFs aquí
import facturacionGif from '../../assets/mockups/facturacion.gif';
import envioGif from '../../assets/mockups/envio.gif';
import gestionGif from '../../assets/mockups/gestion.gif';
import inventarioGif from '../../assets/mockups/inventario.gif';

const functionalities = [
  {
    id: 1,
    title: 'Facturación rápida',
    description: 'Emite facturas en segundos con nuestra interfaz intuitiva y plantillas predefinidas.',
    icon: Zap,
    image: facturacionGif,
    features: [
      'Plantillas personalizables',
      'Datos de clientes preguardados',
      'Cálculo automático de impuestos',
      'Historial de facturas recientes'
    ]
  },
  {
    id: 2,
    title: 'Envío automático a SUNAT',
    description: 'Integración directa con SUNAT para envío automático de comprobantes electrónicos.',
    icon: Send,
    image: envioGif,
    features: [
      'Comunicación directa con SUNAT',
      'Validación automática de documentos',
      'Reintentos automáticos en caso de error',
      'Archivos XML y PDF generados automáticamente'
    ]
  },
  {
    id: 3,
    title: 'Gestión de boletas y notas',
    description: 'Administra todos tus comprobantes electrónicos en un solo lugar de forma organizada.',
    icon: FileText,
    image: gestionGif,
    features: [
      'Registro de boletas de venta',
      'Emisión de notas de crédito y débito',
      'Búsqueda avanzada de comprobantes',
      'Estado de envío a SUNAT en tiempo real'
    ]
  },
  {
    id: 4,
    title: 'Control de inventario',
    description: 'Mantén un control preciso de tu stock con alertas y reportes automáticos.',
    icon: Package,
    image: inventarioGif,
    features: [
      'Registro de productos y categorías',
      'Alertas de stock mínimo',
      'Kardex de movimientos',
      'Reportes de inventario descargables'
    ]
  }
];

const FunctionalitySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography variant="h2" color="default" className="mb-4">
            Funcionalidades Potentes
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto">
            Descubre cómo nuestro sistema de facturación electrónica simplifica tus procesos y optimiza tu negocio.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Navegación por pestañas */}
          <div>
            <div className="space-y-4">
              {functionalities.map((func, index) => (
                <motion.div
                  key={func.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-white dark:bg-gray-800 shadow-md border-l-4 border-primary-600'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg ${
                      activeTab === index 
                        ? 'bg-primary-100 dark:bg-primary-900/30' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      <func.icon className={`h-6 w-6 ${
                        activeTab === index 
                          ? 'text-primary-600' 
                          : 'text-gray-600 dark:text-gray-300'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <Typography 
                        variant="h4" 
                        color="default" 
                        className={`font-semibold ${
                          activeTab === index ? 'text-primary-600' : ''
                        }`}
                      >
                        {func.title}
                      </Typography>
                      
                      {/* Lista de características (solo visible en activo) */}
                      {activeTab === index && (
                        <ul className="mt-4 space-y-2">
                                                  <Typography variant="body" color="muted" className="mt-2">
                        {func.description}
                      </Typography>
                          {func.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary-600 mt-2.5 mr-2 flex-shrink-0" />
                              <Typography variant="body" color="muted" className="text-sm">
                                {feature}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visualización de la funcionalidad seleccionada */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              {/* Barra de título de ventana simulada */}
              <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center">
                  <Typography variant="body" color="muted" className="text-sm font-medium">
                    {functionalities[activeTab].title} - Cistcor Facturación
                  </Typography>
                </div>
              </div>
              
              {/* Contenedor de la imagen/GIF */}
              <div className="relative">
                <img 
                  src={functionalities[activeTab].image} 
                  alt={functionalities[activeTab].title}
                  className="w-full h-auto"
                />
                
                {/* Controles de reproducción para GIFs */}
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label={isPlaying ? 'Pausar animación' : 'Reproducir animación'}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    ) : (
                      <Play className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Indicador de pestaña activa */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
              <div className="flex space-x-2">
                {functionalities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === activeTab ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Ver ${functionalities[index].title}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FunctionalitySection;