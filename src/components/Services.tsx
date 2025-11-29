import React from 'react';
import { motion } from 'framer-motion';
import { useCollection } from '../hooks/useFirestore';
import { Loader2 } from 'lucide-react';

const Services: React.FC = () => {
  // Leer servicios de Firebase (solo los publicados y activos)
  const { data: allServices, loading, error } = useCollection('services', true);
  
  // Filtrar servicios activos
  const services = allServices.filter((service: any) => service.active);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-gold" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading services:', error);
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Nuestros <span className="text-gold">Servicios</span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de tratamientos dentales con la más alta calidad 
            y tecnología de vanguardia para cuidar tu sonrisa.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service: any) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              className="bg-cream p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-4xl mb-4 text-center"
              >
                {service.emoji}
              </motion.div>
              
              <h3 className="text-xl font-semibold text-charcoal mb-4 text-center">
                {service.title}
              </h3>
              
              <p className="text-charcoal/70 text-center leading-relaxed">
                {service.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gold rounded-full mt-6"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg"
          >
            Agenda tu consulta
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;