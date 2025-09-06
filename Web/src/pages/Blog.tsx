import React from 'react';
import { motion } from 'framer-motion';
// import { BlogGrid } from '../components/sections/BlogGrid';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { Search, Filter } from 'lucide-react';
import { Input } from '../components/atoms/Input';

export const Blog: React.FC = () => {
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
            Blog y Novedades
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg mb-8">
            Mantente informado sobre las últimas tendencias tecnológicas, 
            mejores prácticas y novedades de la industria.
          </Typography>
          
          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
          >
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                placeholder="Buscar artículos..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" icon={Filter}>
              Filtros
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* <BlogGrid /> */}
      
      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Typography variant="h2" color="default" className="mb-6">
            Mantente al Día
          </Typography>
          <Typography variant="body" color="muted" className="mb-8 text-lg">
            Suscríbete a nuestro newsletter y recibe las últimas novedades directamente en tu correo.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input placeholder="tu@email.com" type="email" className="flex-1" />
            <Button variant="primary">
              Suscribirse
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};