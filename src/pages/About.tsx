import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, Shield, Globe, Heart, Zap } from 'lucide-react';
import { Typography } from '../components/atoms/Typography';
import { ServiceCard } from '../components/molecules/ServiceCard';
import Nosotros from '../assets/nosotros/acerca.png';

// Imágenes de ejemplo para clientes (deberás reemplazarlas con las reales)
import VisaLogo from '../assets/brand/1.png';
import SamsungLogo from '../assets/brand/1.png';
import EnterguLogo from '../assets/brand/1.png';
import EngeeLogo from '../assets/brand/1.png';
import AxonLogo from '../assets/brand/1.png';
import CelaneseLogo from '../assets/brand/1.png';
import { ClientTestimonials } from '../components/molecules/Testimonials';

const values = [
  {
    title: 'Misión',
    description: 'Ofrecer soluciones tecnológicas simples y efectivas que impulsen la competitividad y productividad de los negocios.',
    icon: Target,
  },
  {
    title: 'Visión',
    description: 'Ser líder en tecnología en el Perú, brindando soluciones innovadoras que potencien el crecimiento empresarial.',
    icon: Users,
  },
  {
    title: 'Valores',
    description: 'Enfoque en el cliente, excelencia, innovación, trabajo en equipo y resiliencia ante los desafíos.',
    icon: Award,
  },
  {
    title: 'Crecimiento',
    description: 'Impulsamos a nuestros clientes hacia el éxito digital.',
    icon: TrendingUp,
  },
];


const principles = [
  {
    title: 'Integridad',
    description: 'Actuamos con honestidad y transparencia en todas nuestras operaciones y relaciones comerciales.',
    icon: Heart,
  },
  {
    title: 'Innovación',
    description: 'Desarrollamos soluciones financieras avanzadas que anticipan las necesidades del mercado futuro.',
    icon: Zap,
  },
  {
    title: 'Seguridad',
    description: 'Protegemos datos y transacciones con protocolos de seguridad de última generación.',
    icon: Shield,
  },
  {
    title: 'Alcance global',
    description: 'Servimos a clientes en más de 24 países con soluciones adaptadas a cada mercado.',
    icon: Globe,
  },
];

const clients = [
  { name: 'VISA', logo: VisaLogo },
  { name: 'SAMSUNG', logo: SamsungLogo },
  { name: 'entergu', logo: EnterguLogo },
  { name: 'ENGEE', logo: EngeeLogo },
  { name: 'AXON', logo: AxonLogo },
  { name: 'Celanese', logo: CelaneseLogo },
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
          className="text-center mb-10"
        >
          <Typography variant="h2" color="default" className="mb-6">
            <span className='text-primary-500'>Transformando </span>empresas con tecnología
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
            <Typography variant="body" color="muted" className="mb-6 text-justify">
              Somos una empresa 100% peruana, con más de 10 años de experiencia,
              especializada en brindar servicios tecnológicos a pequeños negocios
              como a grandes empresas de diferentes sectores. Nuestro personal
              altamente capacitado está siempre innovando para brindarte las mejores soluciones.
            </Typography>
            <Typography variant="body" color="muted" className="mb-6 text-justify">
              Más de 1000 usuarios en el Perú confían en nosotros para sus pagos
              y crecimiento financiero.
            </Typography>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <Typography variant="h3" color="primary">200+</Typography>
                <Typography variant="caption" color="muted">Clientes <span className='text-primary-500'>Satisfechos</span></Typography>
              </div>
              <div className="text-center">
                <Typography variant="h3" color="primary">500+</Typography>
                <Typography variant="caption" color="muted">Proyectos <span className='text-primary-500'>Reallziados</span></Typography>
              </div>
              <div className="text-center">
                <Typography variant="h3" color="primary">10+</Typography>
                <Typography variant="caption" color="muted">Años <span className='text-primary-500'>en el Mercado</span></Typography>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={Nosotros}
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
          className="mb-20"
        >
          <Typography variant="h3" color="default" className="text-center mb-12">
            Nuestros Valores
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
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

        {/* Principles Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-40"
        >
          <div className="text-center mb-12">
            <Typography variant="h3" color="default" className="mb-4">
              Nuestros Principios, <span className='text-primary-500'>Impulsados por la Innovación</span>
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                className="p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-center mb-4">
                  <principle.icon className="h-12 w-12 text-primary-500" />
                </div>
                <Typography variant="h4" color="default" className="text-center mb-3">
                  {principle.title}
                </Typography>
                <Typography variant="body" color="muted" className="text-center">
                  {principle.description}
                </Typography>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Clients Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-20"
        >
          <Typography variant="h3" color="default" className="text-center mb-12">
            Construyendo Confianza con <span className='text-primary-500'>Clientes Globales</span>
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                className="flex justify-center p-4 rounded-lg h-24"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="object-contain max-h-16"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center rounded-2xl p-12"
        >
          <ClientTestimonials></ClientTestimonials>
        </motion.div>
      </div>
    </div>
  );
};
