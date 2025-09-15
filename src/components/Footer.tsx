import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Instagram, Music2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <img src="/src/assets/logo.svg" alt="Dr Smile" className="h-12 mb-6" />
            <p className="text-white/70 leading-relaxed mb-6">
              Tu sonrisa es nuestra pasión. Transformamos vidas a través de 
              tratamientos dentales de excelencia y cuidado personalizado.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <motion.a
                href="https://instagram.com/drsmile"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 15 }}
                className="bg-white/10 p-3 rounded-full hover:bg-gold transition-all duration-300"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="https://tiktok.com/@drsmile"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -15 }}
                className="bg-white/10 p-3 rounded-full hover:bg-gold transition-all duration-300"
              >
                <Music2 size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gold" />
                <span className="text-white/80">+57 316 6817878</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gold" />
                <span className="text-white/80">contacto@drsmile.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-1" />
                <span className="text-white/80">
                  Patios de, Av. 4b Nte. #58N-60 Local 9<br />
                  Menga, Cali<br />
                  Valle del Cauca, Colombia
                </span>
              </div>
            </div>
          </motion.div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gold mb-6">Horarios</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={16} className="text-gold" />
                <span className="text-white/80 font-medium">Atención</span>
              </div>
              <div className="space-y-2 text-white/70">
                <p>Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                <p>Sábados: 8:00 AM - 2:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gold/20 p-3 rounded-lg mt-4"
              >
                <p className="text-gold text-sm font-medium">
                  🚨 Emergencias 24/7 disponibles
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Services Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gold mb-6">Servicios</h3>
            <div className="space-y-3">
              <a href="#services" className="block text-white/70 hover:text-gold transition-colors duration-300">
                Ortodoncia invisible
              </a>
              <a href="#services" className="block text-white/70 hover:text-gold transition-colors duration-300">
                Diseño de sonrisa
              </a>
              <a href="#services" className="block text-white/70 hover:text-gold transition-colors duration-300">
                Blanqueamiento
              </a>
              <a href="#services" className="block text-white/70 hover:text-gold transition-colors duration-300">
                Porcelain Veneers
              </a>
              <a href="#services" className="block text-white/70 hover:text-gold transition-colors duration-300">
                Armonía orofacial
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 Dr Smile. Todos los derechos reservados.
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-gold transition-colors duration-300">
              Aviso de Privacidad
            </a>
            <a href="#" className="text-white/60 hover:text-gold transition-colors duration-300">
              Términos y Condiciones
            </a>
            <a href="#" className="text-white/60 hover:text-gold transition-colors duration-300">
              Política de Cookies
            </a>
          </div>
        </motion.div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🦷 Agenda tu consulta gratuita
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;