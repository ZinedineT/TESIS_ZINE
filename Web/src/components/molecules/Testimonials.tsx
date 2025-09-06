// components/molecules/ClientTestimonials.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Typography } from '../atoms/Typography';

// Importar avatares de clientes
import cl1 from '../../assets/clients/1.jpg';
import cl2 from '../../assets/clients/2.jpg';
import cl3 from '../../assets/clients/3.jpg';
import cl4 from '../../assets/clients/4.jpg';
import cl5 from '../../assets/clients/5.jpg';
import cl6 from '../../assets/clients/6.jpg';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  comment: string;
  avatar: string;
  rating: number;
}

interface ClientTestimonialsProps {
  title?: string;
  testimonials?: Testimonial[];
  testimonialsPerPage?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const ClientTestimonials: React.FC<ClientTestimonialsProps> = ({
  title = "Lo que dicen nuestros clientes",
  testimonials = [
    {
      id: 1,
      name: 'María González',
      position: 'Gerente Financiero',
      company: 'Importaciones Perú',
      comment: 'El sistema de facturación ha simplificado enormemente nuestros procesos contables.',
      avatar: cl1,
      rating: 5
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      position: 'Contador Senior',
      company: 'Distribuidora Andina',
      comment: 'La plataforma es intuitiva y el soporte técnico responde rápidamente a nuestras consultas.',
      avatar: cl2,
      rating: 5
    },
    {
      id: 3,
      name: 'Ana Mendoza',
      position: 'Directora de Operaciones',
      company: 'Servicios Logísticos SAC',
      comment: 'Desde que implementamos Cistcor, nuestros tiempos de facturación se redujeron en un 60%.',
      avatar: cl3,
      rating: 4
    },
    {
      id: 4,
      name: 'Jorge Silva',
      position: 'CEO',
      company: 'Tecnologías Avanzadas',
      comment: 'La integración con SUNAT es impecable. Nunca hemos tenido problemas con nuestros envíos.',
      avatar: cl4,
      rating: 5
    },
    {
      id: 5,
      name: 'Lucía Torres',
      position: 'Contadora',
      company: 'Consultoría Fiscal',
      comment: 'El control de inventario me ha ahorrado horas de trabajo semanal. Altamente recomendado.',
      avatar: cl5,
      rating: 5
    },
    {
      id: 6,
      name: 'Roberto Díaz',
      position: 'Gerente General',
      company: 'Distribuciones Unidas',
      comment: 'La facturación rápida nos permite atender a más clientes en menos tiempo.',
      avatar: cl6,
      rating: 5
    }
  ],
  testimonialsPerPage = 3,
  autoPlay = true,
  autoPlayInterval = 5000
}) => {
  const [testimonialPage, setTestimonialPage] = useState(0);

  // Efecto para el carrusel automático de testimonios
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setTestimonialPage((prev) => 
        prev + 1 >= Math.ceil(testimonials.length / testimonialsPerPage) ? 0 : prev + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [testimonials.length, testimonialsPerPage, autoPlay, autoPlayInterval]);

  // Función para navegar testimonios
  const nextTestimonialPage = () => {
    setTestimonialPage((prev) => 
      prev + 1 >= Math.ceil(testimonials.length / testimonialsPerPage) ? 0 : prev + 1
    );
  };

  const prevTestimonialPage = () => {
    setTestimonialPage((prev) => 
      prev === 0 ? Math.ceil(testimonials.length / testimonialsPerPage) - 1 : prev - 1
    );
  };

  // Obtener testimonios para la página actual
  const currentTestimonials = testimonials.slice(
    testimonialPage * testimonialsPerPage,
    (testimonialPage + 1) * testimonialsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative"
    >
      <Typography variant="h3" color="default" className="text-center mb-10">
        {title}
      </Typography>
      
      <div className="relative overflow-hidden">
        {/* Botones de navegación para testimonios */}
        <button 
          onClick={prevTestimonialPage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button 
          onClick={nextTestimonialPage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-500">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icono de comillas */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-400 dark:text-primary-400/60" />
              
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <Typography variant="h4" color="default" className="font-semibold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body" color="muted" className="text-sm">
                    {testimonial.position}, {testimonial.company}
                  </Typography>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <Typography variant="body" color="muted" className="italic">
                "{testimonial.comment}"
              </Typography>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Indicadores para testimonios */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(testimonials.length / testimonialsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setTestimonialPage(index)}
            className={`h-2 w-2 rounded-full ${
              index === testimonialPage ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};