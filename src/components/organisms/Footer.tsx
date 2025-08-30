import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Logo } from '../atoms/Logo';
import { Typography } from '../atoms/Typography';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Logo size="lg" className="text-white" />
            <Typography variant="body" color="muted">
              Soluciones tecnológicas innovadoras para impulsar el crecimiento de tu empresa.
            </Typography>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <Typography variant="h6" color="default">
              Servicios
            </Typography>
            <ul className="space-y-2">
              {['Desarrollo Web', 'Consultoría IT', 'Cloud Computing', 'Seguridad', 'Automatización'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <Typography variant="h6" color="default">
              Enlaces Rápidos
            </Typography>
            <ul className="space-y-2">
              {['Inicio', 'Nosotros', 'Productos', 'Blog', 'Contacto'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <Typography variant="h6" color="default">
              Contacto
            </Typography>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary-500" />
                <span className="text-gray-400">info@cistcor.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-primary-500" />
                <span className="text-gray-400">+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-primary-500" />
                <span className="text-gray-400">Madrid, España</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <Typography variant="caption" color="muted">
            © 2025 Cistcor. Todos los derechos reservados.
          </Typography>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              Términos de Uso
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};