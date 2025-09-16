import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hola Dr Smile, me interesa agendar una cita. ¡Saludos!`);
    window.open(`https://wa.me/573166817878?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+573166817878';
  };

  return (
    <section id="contact" className="py-20 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para tu nueva{' '}
            <span className="text-gold">sonrisa</span>?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Contáctanos directamente para agendar tu consulta gratuita. 
            Estamos aquí para ayudarte a conseguir la sonrisa de tus sueños.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-gold">
                Contacto directo
              </h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                Elige la opción que más te convenga para contactarnos de inmediato
              </p>
            </div>

            {/* WhatsApp Button */}
            <motion.button
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-6 px-8 rounded-2xl font-semibold flex items-center justify-center gap-4 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <MessageCircle size={32} />
              <div className="text-left">
                <div className="text-xl font-bold">WhatsApp</div>
                <div className="text-lg opacity-90">+57 316 6817878</div>
                <div className="text-sm opacity-75">Respuesta inmediata</div>
              </div>
            </motion.button>

            {/* Call Button */}
            <motion.button
              onClick={handleCall}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 rounded-2xl font-semibold flex items-center justify-center gap-4 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Phone size={32} />
              <div className="text-left">
                <div className="text-xl font-bold">Llamar ahora</div>
                <div className="text-lg opacity-90">+57 316 6817878</div>
                <div className="text-sm opacity-75">Atención directa</div>
              </div>
            </motion.button>

            {/* Benefits Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
            >
              <h4 className="text-xl font-semibold mb-6 text-gold text-center">
                🦷 Consulta gratuita incluye
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3 text-white/80">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Evaluación dental completa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Plan de tratamiento personalizado</span>
                  </div>
                </div>
                <div className="space-y-3 text-white/80">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Presupuesto sin compromiso</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span>Asesoramiento profesional</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gold/10 p-6 rounded-2xl border border-gold/20"
            >
              <h4 className="text-lg font-semibold mb-4 text-gold text-center">
                📍 Nuestra ubicación
              </h4>
              <p className="text-white/80 text-center leading-relaxed">
                Patios de, Av. 4b Nte. #58N-60 Local 9<br />
                Menga, Cali, Valle del Cauca<br />
                Colombia
              </p>
              
              <div className="mt-4 text-center">
                <p className="text-white/60 text-sm">
                  <strong>Horarios:</strong> Lun-Vie 8:00AM-6:00PM | Sáb 8:00AM-2:00PM
                </p>
              </div>
            </motion.div>

            {/* Emergency Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 font-semibold">
                  🚨 Emergencias dentales 24/7 disponibles
                </p>
                <p className="text-red-300 text-sm mt-1">
                  Para urgencias fuera del horario, contactanos por WhatsApp
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;