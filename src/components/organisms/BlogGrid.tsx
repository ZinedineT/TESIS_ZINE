import React from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '../molecules/BlogCard';
import { Typography } from '../atoms/Typography';

const blogPosts = [
  {
    title: 'El Futuro de la Inteligencia Artificial en las Empresas',
    excerpt: 'Descubre cómo la IA está transformando los procesos empresariales y qué esperar en los próximos años.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500',
    date: '15 Ene 2025',
    author: 'María González',
    readTime: '5 min',
  },
  {
    title: 'Migración a la Nube: Guía Completa para Empresas',
    excerpt: 'Todo lo que necesitas saber para migrar tu infraestructura a la nube de forma segura y eficiente.',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=500',
    date: '10 Ene 2025',
    author: 'Carlos Ruiz',
    readTime: '8 min',
  },
  {
    title: 'Tendencias en Desarrollo Web para 2025',
    excerpt: 'Las tecnologías y frameworks que dominarán el desarrollo web este año.',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    date: '5 Ene 2025',
    author: 'Ana Torres',
    readTime: '6 min',
  },
];

export const BlogGrid: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Typography variant="h2" color="default" className="mb-6">
            Últimas Novedades
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg">
            Mantente al día con las últimas tendencias tecnológicas y novedades de la industria.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard {...post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};