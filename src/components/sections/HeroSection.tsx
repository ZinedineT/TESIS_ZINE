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
    right: 'lg:right-10 lg:top-10 right-4 top-4',
    left: 'lg:left-10 lg:top-10 left-4 top-4',
    'right-bottom': 'lg:right-10 lg:bottom-10 right-4 bottom-4',
    'left-bottom': 'lg:left-10 lg:bottom-10 left-4 bottom-4',
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
        <div className="absolute -inset-4 bg-primary-500/20 rounded-2xl blur-lg -z-10 animate-pulse"></div>
        <img 
          src={image} 
          alt="Interfaz de software" 
          className="w-40 lg:w-56 h-auto rounded-xl shadow-2xl border-2 border-white/20"
        />
        
        {/* Efecto de brillo/reflejo */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl pointer-events-none"></div>
        
        {/* Indicador de animación (puntos pulsantes) */}
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-success-500 rounded-full"
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
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contenido de texto (izquierda) */}
          <div className="text-left">
            {slides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div className="mb-8">
                    <Typography variant="h2" color="secondary" className="mb-2">
                      {slide.title1}
                    </Typography>
                    <Typography variant="h1" color="primary" className="mb-4">
                      {slide.title2}
                    </Typography>
                    <Typography variant="body" color="muted" className="max-w-md text-lg">
                      {slide.subtitle}
                    </Typography>
                  </motion.div>

                  <motion.div className="flex flex-col sm:flex-row gap-4">
                    <a href={slide.buttonLink}>
                      <Button
                        variant="primary"
                        size="lg"
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        {slide.buttonText}
                      </Button>
                    </a>
                    <Button variant="outline" size="lg">
                      Ver Productos
                    </Button>
                  </motion.div>
                </motion.div>
              )
            ))}
          </div>

          {/* Imagen del slider (derecha) */}
          <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center overflow-hidden rounded-lg">
            <AnimatePresence>
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
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                    
                    {/* Imagen flotante de software para todos los slides que tengan softwareImage */}
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
        <div className="mt-8 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-primary-500' : 'bg-primary-300 dark:bg-primary-700'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};