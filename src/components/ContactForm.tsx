import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, User, Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hola Dr Smile, me interesa agendar una cita. Mi nombre es ${formData.name || 'sin especificar'}.`);
    window.open(`https://wa.me/573201234567?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+5721234567';
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
            Contáctanos para agendar tu consulta gratuita. Estamos aquí para ayudarte 
            a conseguir la sonrisa de tus sueños.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2 font-medium">
                  Nombre completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300"
                    placeholder="Tu nombre completo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-medium">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-medium">
                  Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300"
                    placeholder="+57 316 6817878"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-medium">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 resize-none"
                  placeholder="Cuéntanos sobre tu caso o el tratamiento que te interesa..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gold hover:bg-gold/90 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send size={20} />
                    Enviar mensaje
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gold">
                Contacto directo
              </h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                ¿Prefieres contactarnos directamente? Elige la opción que más te convenga.
              </p>
            </div>

            <motion.button
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300"
            >
              <MessageCircle size={24} />
              <div className="text-left">
                <div>WhatsApp</div>
                <div className="text-sm opacity-90">+57 320 123 4567</div>
              </div>
            </motion.button>

            <motion.button
              onClick={handleCall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300"
            >
              <Phone size={24} />
              <div className="text-left">
                <div>Llamar ahora</div>
                <div className="text-sm opacity-90">+57 2 123 4567</div>
              </div>
            </motion.button>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-gold">Consulta gratuita</h4>
              <ul className="space-y-2 text-white/80">
                <li>✓ Evaluación dental completa</li>
                <li>✓ Plan de tratamiento personalizado</li>
                <li>✓ Presupuesto sin compromiso</li>
                <li>✓ Asesoramiento profesional</li>
              </ul>
            </div>

            <div className="bg-gold/10 p-6 rounded-lg border border-gold/20">
              <h4 className="text-lg font-semibold mb-4 text-gold">📍 Ubicación</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Patios de, Av. 4b Nte. #58N-60 Local 9<br />
                Menga, Cali, Valle del Cauca<br />
                Colombia
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;