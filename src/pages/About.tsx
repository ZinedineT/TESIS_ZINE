import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp} from 'lucide-react';
import { Typography } from '../components/atoms/Typography';
import { ServiceCard } from '../components/molecules/ServiceCard';
import Nosotros from '../assets/nosotros/acerca.png';

// Imágenes de ejemplo para clientes (deberás reemplazarlas con las reales)
import GoogleLogo from '../assets/corp/google.png';
import SamsungLogo from '../assets/brand/1.png';
import GodaddyLogo from '../assets/corp/godaddy.png';
import EngeeLogo from '../assets/brand/1.png';
import ZohoLogo from '../assets/corp/zoho.png';
import CelaneseLogo from '../assets/brand/1.png';
import { Testimonials } from '../components/molecules/Testimonials';
import { IndustriesSection } from '../components/sections/IndustriesSection';

const values = [
  {
    title: 'Misión',
    description: 'Ofrecer soluciones tecnológicas simples y efectivas.',
    icon: Target,
  },
  {
    title: 'Visión',
    description: 'Ser líder en tecnología en el Perú, brindando soluciones.',
    icon: Users,
  },
  {
    title: 'Valores',
    description: 'Enfoque en el cliente, excelencia, innovación y trabajo en equipo.',
    icon: Award,
  },
  {
    title: 'Crecimiento',
    description: 'Impulsamos a nuestros clientes hacia el éxito digital.',
    icon: TrendingUp,
  },
];

const clients = [
  { name: 'GOOGLE', logo: GoogleLogo },
  { name: 'SAMSUNG', logo: SamsungLogo },
  { name: 'GODADDY', logo: GodaddyLogo },
  { name: 'ENGEE', logo: EngeeLogo },
  { name: 'ZOHO', logo: ZohoLogo },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 text-justify">
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
        <IndustriesSection/>

        {/* Future Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center rounded-2xl p-12"
        >
          <Testimonials/>
        </motion.div>
      </div>
    </div>
  );
};
