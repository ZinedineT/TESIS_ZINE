// components/molecules/ClientLogos.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Typography } from '../atoms/Typography';

// Importar logos
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

interface Company {
  id: number;
  name: string;
  logo: string;
}

interface ClientLogosProps {
  title?: string;
  companies?: Company[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const ClientLogos: React.FC<ClientLogosProps> = ({
  title = "Nuestros clientes",
  companies = [
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
  autoPlay = true,
  autoPlayInterval = 3000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

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

  // Efecto para el carrusel automático
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev + 1 >= companies.length - visibleItems + 1 ? 0 : prev + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [visibleItems, companies.length, autoPlay, autoPlayInterval]);

  // Función para navegar manualmente
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + 1 >= companies.length - visibleItems + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? companies.length - visibleItems : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-12 relative"
    >
      {title && (
        <Typography variant="h3" color="default" className="text-center mb-10">
          {title}
        </Typography>
      )}
      
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
          {companies.map((company) => (
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
        {Array.from({ length: companies.length - visibleItems + 1 }).map((_, index) => (
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
  );
};