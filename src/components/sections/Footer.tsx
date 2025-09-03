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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Logo size="lg" className="text-white text-justify" />
            <Typography variant="body" color="muted">
              Especializados en brindar servicios tecnológicos a empresas de diferentes sectores.
            </Typography>
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
              {['Facturación Electrónica', 'Diseño Web', 'Correo Corporativo', 'Soporte TIC'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
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
            className="space-y-4"
          >
            <Typography variant="h6" color="default">
              Contacto
            </Typography>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary-500" />
                <a href="mailto:info@cistcor.com" className="text-gray-500 hover:text-white transition-colors duration-200">
                  info@cistcor.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-primary-500" />
                <a href="tel:+51944735227" className="text-gray-500 hover:text-white transition-colors duration-200">
                  944 735 227
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-primary-500" />
                <span className="text-gray-500">Huanuco, Perú</span>
              </div>
            </div>
          </motion.div>
                    {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <Typography variant="h6" color="default">
              Visitanos en Redes
            </Typography>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, url, label }, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={`Visita nuestro perfil en ${label}`}
                >
                  <Icon size={30} />
                </motion.a>
              ))}
            </div>
            {/* <ul className="space-y-2">
              {[
                { text: 'Jr. San Martin 1224 - Huánuco', href: '#' },
                { text: 'Ventas: 944 735 227', href: 'https://wa.link/o4zoyc' },
                // { text: 'Ventas: 989 889 371', href: 'https://wa.link/o4zoyc' },
                // { text: 'Soporte: 986 687 711', href: 'https://wa.link/o4zoyc' },
                { text: 'comercial@cistcor.com', href: 'mailto:comercial@cistcor.com' },
                // { text: 'soporte@cistcor.com', href: 'mailto:soporte@cistcor.com' },
              ].map(({ text, href }) => (
                <li key={text}>
                  <a href={href} className="text-gray-500 hover:text-white transition-colors duration-200">
                    {text}
                  </a>
                </li>
              ))}
            </ul> */}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <Typography variant="caption" color="muted">
            Copyright 2025 © CISTCOR NETWORKS S.A.C.
          </Typography>
        </motion.div>
      </div>
    </footer>
  );
};