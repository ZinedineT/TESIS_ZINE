import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Shield, Code, Cog, Database, Smartphone } from 'lucide-react';
import { ServiceCard } from '../molecules/ServiceCard';
import { Typography } from '../atoms/Typography';

const services = [
  {
    title: 'Desarrollo Web',
    description: 'Aplicaciones web modernas, responsivas y optimizadas para SEO.',
    icon: Code,
  },
  {
    title: 'Cloud Computing',
    description: 'Migración y gestión de infraestructura en la nube.',
    icon: Cloud,
  },
  {
    title: 'Ciberseguridad',
    description: 'Protección integral de datos y sistemas empresariales.',
    icon: Shield,
  },
  {
    title: 'Automatización',
    description: 'Procesos automatizados para mejorar la eficiencia operativa.',
    icon: Cog,
  },
  {
    title: 'Base de Datos',
    description: 'Diseño, optimización y gestión de bases de datos.',
    icon: Database,
  },
  {
    title: 'Apps Móviles',
    description: 'Desarrollo de aplicaciones nativas y multiplataforma.',
    icon: Smartphone,
  },
];

export const ServicesGrid: React.FC = () => {
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
            Nuestros Servicios
          </Typography>
          <Typography variant="body" color="muted" className="max-w-3xl mx-auto text-lg">
            Ofrecemos soluciones tecnológicas integrales diseñadas para impulsar 
            el crecimiento y la innovación en tu empresa.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};