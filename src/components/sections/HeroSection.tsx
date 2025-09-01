import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import img1 from '../../assets/hero1.jpg';
import img2 from '../../assets/hero2.jpg';
import img3 from '../../assets/hero3.jpg';

// Datos del slider (reemplaza con tus URLs de imágenes reales)
const slides = [
  {
    image: img1,
    title1: 'Sistema de Facturación',
    title2: 'Electrónica',
    subtitle: 'para tu negocio!',
    buttonText: 'DEMO GRATIS',
    buttonLink: 'https://cistcorfact.cistcor.com/register.php',
  },
  {
    image: img2,
    title1: 'Diseño de Páginas web',
    title2: 'WEBSITE',
    subtitle: '¡Véndele al mundo entero!',
    buttonText: 'Contáctanos',
    buttonLink: '/contact.php',
  },
  {
    image: img3,
    title1: 'CORREOS',
    title2: 'CORPORATIVOS',
    subtitle: '¡Muestra una imagen profesional!',
    buttonText: 'Contáctanos',
    buttonLink: '/contact.php',
  },
];

const FloatingIcon: React.FC<{ x: string; y: string; delay: number }> = ({ x, y, delay }) => (
  <motion.div
    className="absolute text-primary-500 opacity-50"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
      delay,
    }}
  >
    <Sparkles size={32} />
  </motion.div>
);

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
                    <Typography variant="h2" color="default" className="mb-2">
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
                      className="max-h-full max-w-full object-contain"
                    />
                    
                    {/* Iconos flotantes sobre la imagen */}
                    <FloatingIcon x="10%" y="20%" delay={0} />
                    <FloatingIcon x="80%" y="30%" delay={0.5} />
                    <FloatingIcon x="20%" y="70%" delay={1} />
                    <FloatingIcon x="70%" y="60%" delay={1.5} />
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