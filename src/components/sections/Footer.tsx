import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { FaTiktok } from "react-icons/fa";
import { Logo } from '../atoms/Logo';
import { Typography } from '../atoms/Typography';

export const Footer = () => {
  // Objeto con las URLs de las redes sociales
  const socialLinks = [
    { Icon: Facebook, url: 'https://web.facebook.com/cistcor', label: 'Facebook' },
    { Icon: Instagram, url: 'https://www.instagram.com/cistcor/', label: 'Instagram' },
    { Icon: Youtube, url: 'https://www.youtube.com/@Cistcor', label: 'YouTube' },
    { Icon: FaTiktok, url: 'https://www.tiktok.com/@cistcor', label: 'TikTok' }
  ];

  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center sm:text-left"
          >
            <div className="flex justify-center sm:justify-start">
              <Logo size="lg" className="text-white" />
            </div>
            <Typography variant="body" color="muted" className="text-sm md:text-base">
              Especializados en brindar servicios tecnológicos a empresas de diferentes sectores.
            </Typography>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-center sm:text-left"
          >
            <Typography variant="h6" color="default" className="text-base md:text-lg">
              Servicios
            </Typography>
            <ul className="space-y-2">
              {['Facturación Electrónica', 'Diseño Web', 'Correo Corporativo', 'Soporte TIC'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200 text-sm md:text-base">
                    {service}
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
            className="space-y-4 text-center sm:text-left"
          >
            <Typography variant="h6" color="default" className="text-base md:text-lg">
              Contacto
            </Typography>
            <div className="space-y-3">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Mail size={16} className="text-primary-500 flex-shrink-0" />
                <a href="mailto:info@cistcor.com" className="text-gray-500 hover:text-white transition-colors duration-200 text-sm md:text-base break-all">
                  info@cistcor.com
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone size={16} className="text-primary-500 flex-shrink-0" />
                <a href="tel:+51944735227" className="text-gray-500 hover:text-white transition-colors duration-200 text-sm md:text-base">
                  944 735 227
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <MapPin size={16} className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-500 text-sm md:text-base">Huanuco, Perú</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 text-center sm:text-left"
          >
            <Typography variant="h6" color="default" className="text-base md:text-lg">
              Visitanos en Redes
            </Typography>
            <div className="flex justify-center sm:justify-start space-x-4">
              {socialLinks.map(({ Icon, url, label }, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
                  aria-label={`Visita nuestro perfil en ${label}`}
                >
                  <Icon size={24} className="w-6 h-6 md:w-7 md:h-7" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4"
        >
          <Typography variant="caption" color="muted" className="text-xs md:text-sm text-center">
            Copyright 2025 © CISTCOR NETWORKS S.A.C.
          </Typography>
        </motion.div>
      </div>
    </footer>
  );
};