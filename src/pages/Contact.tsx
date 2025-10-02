import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Typography } from '../components/atoms/Typography';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de envío (para pruebas locales)
    console.log('Form submitted:', formData);
    setFormStatus('success'); // Cambiar a 'error' si falla en el futuro
    // Para integrar con EmailJS más adelante, usa el código que te proporcioné:
    /*
    import emailjs from '@emailjs/browser';
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, 'YOUR_PUBLIC_KEY')
      .then(() => setFormStatus('success'))
      .catch(() => setFormStatus('error'));
    */
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Typography variant="h1" color="default" className="mb-4 font-montserrat">
            Contáctanos
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg font-montserrat">
            ¿Tienes un proyecto en mente? Nos encantaría ayudarte a hacerlo realidad.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary-100 dark:bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8"
          >
            <img src="../../assets/logo.png" alt="" />
            <Typography variant="h3" color="default" className="text-primary-500 mb-6 font-montserrat">
              Envíanos un Mensaje
            </Typography>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Tu nombre"
                  aria-required="true"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="tu@correo.com"
                  aria-required="true"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Empresa"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Nombre de tu empresa"
                />
                <Input
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+51 123 456 789"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-montserrat"
                >
                  Mensaje <span className="text-error-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100 font-montserrat"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  aria-required="true"
                />
              </div>

              {formStatus === 'success' && (
                <Typography variant="body" color="success" className="text-center">
                  ¡Mensaje enviado con éxito!
                </Typography>
              )}
              {formStatus === 'error' && (
                <Typography variant="body" color="error" className="text-center">
                  Error al enviar el mensaje. Intenta de nuevo.
                </Typography>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-montserrat"
                icon={Send}
                iconPosition="right"
                disabled={formStatus === 'success'}
              >
                Enviar Mensaje
              </Button>
            </form>
          </motion.div>

          {/* Contact Info and Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-primary-100 dark:bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <Typography variant="h3" color="default" className="text-primary-500 mb-6 font-montserrat">
                Información de Contacto
              </Typography>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Mail className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <Typography variant="h6" color="default" className="font-montserrat">
                      Email
                    </Typography>
                    <Typography variant="body" color="muted" className="font-montserrat">
                      <a href="mailto:info@cistcor.com" className="hover:text-primary-500">
                        info@cistcor.com
                      </a>
                    </Typography>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Phone className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <Typography variant="h6" color="default" className="font-montserrat">
                      Teléfono
                    </Typography>
                    <Typography variant="body" color="muted" className="font-montserrat">
                      <a href="tel:+51944735227" className="hover:text-primary-500">
                        944 735 227
                      </a>
                    </Typography>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <MapPin className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <Typography variant="h6" color="default" className="font-montserrat">
                      Oficina
                    </Typography>
                    <Typography variant="body" color="muted" className="font-montserrat">
                      Jr. San Martín 1224<br />
                      Huánuco - Perú
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-primary-100 dark:bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <Typography variant="h3" color="default" className="text-primary-500 mb-4 font-montserrat">
                Nuestra Ubicación
              </Typography>
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0978110577075!2d-76.24399168469134!3d-9.925811708774697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7c31dd7343cdb%3A0xd5e3dc0eeb37cad9!2sCISTCOR%20NETWORKS%20S.A.C.!5e0!3m2!1ses-419!2spe!4v1634431429152!5m2!1ses-419!2spe"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación de CISTCOR NETWORKS"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
