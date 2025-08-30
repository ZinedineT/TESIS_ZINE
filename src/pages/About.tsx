import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import { Typography } from '../components/atoms/Typography';
import { ServiceCard } from '../components/molecules/ServiceCard';

const values = [
  {
    title: 'Misión',
    description: 'Impulsar la transformación digital de las empresas con soluciones tecnológicas innovadoras.',
    icon: Target,
  },
  {
    title: 'Equipo',
    description: 'Profesionales altamente capacitados con más de 10 años de experiencia en el sector.',
    icon: Users,
  },
  {
    title: 'Calidad',
    description: 'Comprometidos con la excelencia en cada proyecto que desarrollamos.',
    icon: Award,
  },
  {
    title: 'Crecimiento',
    description: 'Acompañamos a nuestros clientes en su evolución hacia el éxito digital.',
    icon: TrendingUp,
  },
];

export const About: React.FC = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Typography variant="h1" color="default" className="mb-6">
            Sobre Cistcor
          </Typography>
          <Typography variant="body" color="muted" className="max-w-4xl mx-auto text-lg">
            Desde 2015, hemos sido pioneros en ofrecer soluciones tecnológicas que transforman la manera 
            en que las empresas operan, crecen y se conectan con sus clientes.
          </Typography>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <Typography variant="h2" color="default" className="mb-6">
              Nuestra Historia
            </Typography>
            <Typography variant="body" color="muted" className="mb-6">
              Fundada con la visión de democratizar el acceso a tecnologías avanzadas, 
              Cistcor ha evolucionado desde una pequeña consultora hasta convertirse en 
              un referente en soluciones tecnológicas empresariales.
            </Typography>
            <Typography variant="body" color="muted" className="mb-6">
              Hemos trabajado con más de 200 empresas, desde startups hasta corporaciones, 
              ayudándoles a optimizar sus procesos y alcanzar sus objetivos de negocio 
              a través de la tecnología.
            </Typography>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <Typography variant="h3" color="primary">200+</Typography>
                <Typography variant="caption" color="muted">Clientes</Typography>
              </div>
              <div className="text-center">
                <Typography variant="h3" color="primary">500+</Typography>
                <Typography variant="caption" color="muted">Proyectos</Typography>
              </div>
              <div className="text-center">
                <Typography variant="h3" color="primary">10+</Typography>
                <Typography variant="caption" color="muted">Años</Typography>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Equipo Cistcor"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Typography variant="h2" color="default" className="text-center mb-12">
            Nuestros Valores
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              >
                <ServiceCard {...value} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};