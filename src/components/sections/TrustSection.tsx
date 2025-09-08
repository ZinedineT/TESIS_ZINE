import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Typography } from '../atoms/Typography';

// Imagenes de logos
import logo1 from '../../assets/brand/1.png';
import logo2 from '../../assets/brand/2.png';
import logo3 from '../../assets/brand/3.png';
import logo4 from '../../assets/brand/4.png';
import logo5 from '../../assets/brand/5.png';
import logo6 from '../../assets/brand/6.png';
import logo7 from '../../assets/brand/7.png';
import logo8 from '../../assets/brand/8.png';
import logo9 from '../../assets/brand/9.png';
import logo10 from '../../assets/brand/10.png';
import logo11 from '../../assets/brand/11.png';
import logo12 from '../../assets/brand/12.png';

// Imágenes de clientes (avatares)
import cl1 from '../../assets/clients/1.jpg';
import cl2 from '../../assets/clients/2.jpg';
import cl3 from '../../assets/clients/3.jpg';
import cl4 from '../../assets/clients/4.jpg';
import cl5 from '../../assets/clients/5.jpg';
import cl6 from '../../assets/clients/6.jpg';

// Datos actualizados
const trustData = {
  companies: [
    { id: 1, name: 'Empresa 1', logo: logo1 },
    { id: 2, name: 'Empresa 2', logo: logo2 },
    { id: 3, name: 'Empresa 3', logo: logo3 },
    { id: 4, name: 'Empresa 4', logo: logo4 },
    { id: 5, name: 'Empresa 5', logo: logo5 },
    { id: 6, name: 'Empresa 6', logo: logo6 },
    { id: 7, name: 'Empresa 7', logo: logo7 },
    { id: 8, name: 'Empresa 8', logo: logo8 },
    { id: 9, name: 'Empresa 9', logo: logo9 },
    { id: 10, name: 'Empresa 10', logo: logo10 },
    { id: 11, name: 'Empresa 11', logo: logo11 },
    { id: 12, name: 'Empresa 12', logo: logo12 },
  ],
  certifications: [
    { id: 1, name: 'Certificado SUNAT', icon: Award },
    { id: 2, name: 'ISO 9001', icon: CheckCircle },
  ],
  testimonials: [
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
  ]
};

const TrustSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);
  const testimonialsPerPage = 3;
  const testimonialContainerRef = useRef<HTMLDivElement>(null);

  // Ajustar número de logos visibles según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(2);
      } else if (window.innerWidth < 768) {
        setVisibleItems(3);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(4);
      } else {
        setVisibleItems(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efecto para el carrusel automático de logos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev + 1 >= trustData.companies.length - visibleItems + 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [visibleItems]);

  // Efecto para el carrusel automático de testimonios
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialPage((prev) => 
        prev + 1 >= Math.ceil(trustData.testimonials.length / testimonialsPerPage) ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Función para navegar manualmente logos
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + 1 >= trustData.companies.length - visibleItems + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? trustData.companies.length - visibleItems : prev - 1
    );
  };

  // Función para navegar testimonios
  const nextTestimonialPage = () => {
    setTestimonialPage((prev) => 
      prev + 1 >= Math.ceil(trustData.testimonials.length / testimonialsPerPage) ? 0 : prev + 1
    );
  };

  const prevTestimonialPage = () => {
    setTestimonialPage((prev) => 
      prev === 0 ? Math.ceil(trustData.testimonials.length / testimonialsPerPage) - 1 : prev - 1
    );
  };

  // Obtener testimonios para la página actual
  const currentTestimonials = trustData.testimonials.slice(
    testimonialPage * testimonialsPerPage,
    (testimonialPage + 1) * testimonialsPerPage
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography variant="h2" color="default" className="mb-4">
            Confían en {''} <span className="text-primary-600">nosotros</span>
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto">
            Empresas líderes y profesionales eligen nuestros servicios para simplificar sus procesos de facturación electrónica.
          </Typography>
        </motion.div>

        {/* Logos de empresas con carrusel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20 relative"
        >
          <Typography variant="h3" color="default" className="text-center mb-10">
            Nuestros clientes
          </Typography>
          
          <div className="relative overflow-hidden px-10">
            {/* Botones de navegación */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Contenedor del carrusel */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / visibleItems)}%)` }}
            >
              {trustData.companies.map((company) => (
                <div 
                  key={company.id} 
                  className="flex-shrink-0 px-4 flex items-center justify-center"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <motion.div 
                    className="flex items-center justify-center p-4 transition-all hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="max-h-30 max-w-full object-contain filter-none"
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores (puntos) */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: trustData.companies.length - visibleItems + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Certificaciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Typography variant="h3" color="default" className="text-center mb-10">
            Certificaciones y estándares
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {trustData.certifications.map((certification, index) => (
              <motion.div 
                key={certification.id} 
                className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <certification.icon className="h-10 w-10 text-primary-600" />
                </div>
                <div className="ml-4">
                  <Typography variant="h4" color="default" className="text-lg font-semibold">
                    {certification.name}
                  </Typography>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Opiniones de clientes con carrusel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Typography variant="h3" color="default" className="text-center mb-10">
            Lo que dicen nuestros clientes
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

            <div 
              ref={testimonialContainerRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-500"
            >
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
            {Array.from({ length: Math.ceil(trustData.testimonials.length / testimonialsPerPage) }).map((_, index) => (
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
      </div>
    </section>
  );
};

export default TrustSection;