import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import img1 from '../../assets/hero1.png';
import img2 from '../../assets/hero2.png';
import img3 from '../../assets/hero3.png';
import softwareImg from '../../assets/flotantes/facturacion.jpg'; 
import diseñoImg from '../../assets/flotantes/diseño.png'; 
import correoImg from '../../assets/flotantes/correo.png';

// Datos del slider
const slides = [
  {
    image: img1,
    softwareImage: softwareImg,
    title1: 'Sistema de Facturación',
    title2: 'Electrónica',
    subtitle: 'Cumple con la normativa SUNAT, genera tus comprobantes en segundos!',
    buttonText: 'DEMO GRATIS',
    buttonLink: 'https://cistcorfact.cistcor.com/register.php',
    softwarePosition: 'right',
  },
  {
    image: img2,
    softwareImage: diseñoImg,
    title1: 'Diseño de Páginas web',
    title2: 'WEBSITE',
    subtitle: '¡Véndele al mundo entero!',
    buttonText: 'Contáctanos',
    buttonLink: '/contact.php',
    softwarePosition: 'left',
  },
  {
    image: img3,
    softwareImage: correoImg,
    title1: 'CORREOS',
    title2: 'CORPORATIVOS',
    subtitle: '¡Muestra una imagen profesional, nosotros te ayudamos!',
    buttonText: 'Contáctanos',
    buttonLink: '/contact.php',
    softwarePosition: 'right',
  },
];

// Componente para la imagen flotante de software
const FloatingSoftware: React.FC<{ 
  image: string; 
  position: string;
  isActive: boolean;
}> = ({ image, position, isActive }) => {
  const positionClasses = {
    right: 'lg:right-10 lg:top-10 right-2 top-2 md:right-4 md:top-4',
    left: 'lg:left-10 lg:top-10 left-2 top-2 md:left-4 md:top-4',
    'right-bottom': 'lg:right-10 lg:bottom-10 right-2 bottom-2 md:right-4 md:bottom-4',
    'left-bottom': 'lg:left-10 lg:bottom-10 left-2 bottom-2 md:left-4 md:bottom-4',
  };

  return (
    <motion.div
      className={`absolute z-10 ${positionClasses[position as keyof typeof positionClasses]}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0, 
        scale: isActive ? 1 : 0.8,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.7, delay: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        <div className="absolute -inset-2 md:-inset-4 bg-primary-500/20 rounded-xl md:rounded-2xl blur-lg -z-10 animate-pulse"></div>
        <img 
          src={image} 
          alt="Interfaz de software" 
          className="w-24 h-16 md:w-40 md:h-28 lg:w-56 lg:h-40 object-cover rounded-lg md:rounded-xl shadow-xl border-2 border-white/20"
        />
        
        {/* Efecto de brillo/reflejo */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-lg md:rounded-xl pointer-events-none"></div>
        
        {/* Indicador de animación (puntos pulsantes) - Solo en desktop */}
        <motion.div
          className="hidden md:block absolute -top-1 -right-1 md:-top-2 md:-right-2 w-3 h-3 md:w-4 md:h-4 bg-success-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Contenido de texto (izquierda) */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {slides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div className="mb-6 md:mb-8">
                      <Typography 
                        variant="h2" 
                        color="secondary" 
                        className="mb-2 text-2xl md:text-3xl lg:text-4xl"
                      >
                        {slide.title1}
                      </Typography>
                      <Typography 
                        variant="h1" 
                        color="primary" 
                        className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold"
                      >
                        {slide.title2}
                      </Typography>
                      <Typography 
                        variant="body" 
                        color="muted" 
                        className="max-w-md mx-auto lg:mx-0 text-base md:text-lg leading-relaxed"
                      >
                        {slide.subtitle}
                      </Typography>
                    </motion.div>

                    <motion.div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                      <a href={slide.buttonLink} className="flex justify-center lg:justify-start">
                        <Button
                          variant="primary"
                          size="lg"
                          icon={ArrowRight}
                          iconPosition="right"
                          className="w-full sm:w-auto"
                        >
                          {slide.buttonText}
                        </Button>
                      </a>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        Ver Productos
                      </Button>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Imagen del slider (derecha) */}
          <div className="relative w-full h-64 md:h-80 lg:h-[500px] flex items-center justify-center overflow-hidden rounded-xl md:rounded-2xl order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {slides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img 
                      src={slide.image} 
                      alt={`Slide ${index + 1}`} 
                      className="w-full h-full object-cover md:object-contain rounded-xl md:rounded-2xl"
                    />
                    
                    {/* Imagen flotante de software */}
                    {slide.softwareImage && slide.softwarePosition && (
                      <FloatingSoftware 
                        image={slide.softwareImage} 
                        position={slide.softwarePosition}
                        isActive={index === currentSlide}
                      />
                    )}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Indicadores del slider */}
        <div className="mt-6 md:mt-8 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary-500 scale-125' 
                  : 'bg-primary-300 dark:bg-primary-700 hover:bg-primary-400'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};