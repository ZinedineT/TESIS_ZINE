import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Typography } from '../components/atoms/Typography';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Typography variant="h1" color="default" className="mb-6">
            Contáctanos
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg">
            ¿Tienes un proyecto en mente? Nos encantaría ayudarte a hacerlo realidad.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <Typography variant="h3" color="default" className="mb-6">
              Envíanos un Mensaje
            </Typography>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Empresa"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
                <Input
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensaje <span className="text-error-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>
              
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full"
                icon={Send}
                iconPosition="right"
              >
                Enviar Mensaje
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <Typography variant="h3" color="default" className="mb-6">
                Información de Contacto
              </Typography>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Mail className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <Typography variant="h6" color="default">
                      Email
                    </Typography>
                    <Typography variant="body" color="muted">
                      info@cistcor.com
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Phone className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <Typography variant="h6" color="default">
                      Teléfono
                    </Typography>
                    <Typography variant="body" color="muted">
                      +34 900 123 456
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <MapPin className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <Typography variant="h6" color="default">
                      Oficina
                    </Typography>
                    <Typography variant="body" color="muted">
                      Calle Principal 123<br />
                      28001 Madrid, España
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <Typography variant="h5" color="default" className="mb-4">
                Nuestra Ubicación
              </Typography>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Typography variant="body" color="muted">
                  Mapa integrado próximamente
                </Typography>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};