// components/sections/CorporateEmailSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Users, 
  TrendingUp, 
  ArrowRight,
  MessageCircle,
  Building
} from 'lucide-react';
import { Typography } from '../atoms/Typography';
import EmailImage from '../../assets/mail.png';

const features = [
  {
    number: '01',
    title: 'Comunicación Eficiente',
    description: 'Correos con tu dominio propio que reflejan seriedad y confianza.',
    icon: MessageCircle,
    color: 'from-blue-500 to-blue-700'
  },
  {
    number: '02',
    title: 'Profesionalismo y Credibilidad',
    description: 'Correos con tu dominio propio que reflejan seriedad y confianza.',
    icon: Building,
    color: 'from-purple-500 to-purple-700'
  },
  {
    number: '03',
    title: 'Soporte Experto',
    description: 'Nuestro equipo está disponible para brindarte la mejor asesoría y soporte técnico.',
    icon: Users,
    color: 'from-green-500 to-green-700'
  },
  {
    number: '04',
    title: 'Flexibilidad y Escalabilidad',
    description: 'Soluciones que crecen con tu negocio, adecuándose a tus necesidades.',
    icon: TrendingUp,
    color: 'from-orange-500 to-orange-700'
  }
];

export const CorporateEmailSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mb-6">
            <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <Typography variant="h2" color="default" className="mb-6">
            Potencia tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-900">Comunicación Empresarial</span>
          </Typography>
        </motion.div>

        {/* Contenido principal */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Columna izquierda - Características numeradas */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group h-full"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-500/30">
                    <div className="flex items-start mb-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white font-bold text-lg mr-4`}>
                        {feature.number}
                      </div>
                      <div className="flex-1">
                        <Typography variant="h5" color="default" className="font-bold mb-2">
                          {feature.title}
                        </Typography>
                        <Typography variant="body" color="muted" className="text-sm">
                          {feature.description}
                        </Typography>
                      </div>
                    </div>
                  
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Columna derecha - Solo imagen y botón */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="sticky top-24 flex flex-col items-center"
            >
              {/* Título encima de la imagen */}
              <div className="text-center w-full">
                <Typography variant="h3" color="default" className="mb-4">
                  Con <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-900">CISTCORMALL</span>
                </Typography>
                  {/* <Typography variant="body" color="muted" className="mb-2">
                    Fortalece tu identidad empresarial y optimiza la comunicación con tus clientes.
                  </Typography> */}
              </div>
              
              {/* Imagen */}
              <div className="w-full mb-8">
                <img 
                  src={EmailImage} 
                  alt="Correo corporativo CISTCORMALL" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Botón Contactar debajo de la imagen */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-xs bg-gradient-to-r from-primary-600 to-primary-900 text-white py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                Contactar
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};