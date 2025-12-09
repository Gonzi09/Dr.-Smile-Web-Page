import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Heart } from 'lucide-react';

const AboutDoctor: React.FC = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Conoce a nuestra <span className="text-gold">especialista</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gold mb-2">
                Dra. Marcela García
              </h3>
              <p className="text-xl text-charcoal/70 mb-6">Odontóloga Especialista</p>
            </div>

            <p className="text-lg text-charcoal/80 leading-relaxed">
              La doctora Marcela García es odontóloga egresada de la Universidad del Valle. 
              Es especialista en Ortodoncia y Ortopedia Maxilar, y Estética Dental, cuenta con 
              una trayectoria de más de 20 años de experiencia en los cuales ha transformado 
              muchísimas sonrisas.
            </p>

            <p className="text-lg text-charcoal/80 leading-relaxed">
              Como especialista, su filosofía es la odontología conservadora y su sinergia con 
              el resto de disciplinas odontológicas, le proporciona a sus pacientes resultados 
              estéticamente satisfactorios y conservadores, mediante la aplicación de la Estética 
              Odontofacial, donde se busca lograr armonía y estética no solo en los dientes sino 
              en todo el rostro.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white rounded-xl shadow-md"
              >
                <Award className="w-8 h-8 text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-charcoal">20+</div>
                <div className="text-sm text-charcoal/60">Años experiencia</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white rounded-xl shadow-md"
              >
                <GraduationCap className="w-8 h-8 text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-charcoal">U. Valle</div>
                <div className="text-sm text-charcoal/60">Egresada</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white rounded-xl shadow-md"
              >
                <Heart className="w-8 h-8 text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-charcoal">500+</div>
                <div className="text-sm text-charcoal/60">Pacientes</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="src/imgs/DRA.jpg"
                alt="Dra. Marcela García"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                onError={(e) => {
                  // Fallback a imagen de placeholder si la URL no carga
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600';
                }}
              />
              
              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0] 
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gold/20 rounded-full"
              />
              
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0] 
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gold/30 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;