import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock, Loader2 } from 'lucide-react';
import { useSettings } from '../hooks/useFirestore';

const LocationMap: React.FC = () => {
  const { settings: locationSettings, loading } = useSettings('location');
  
  // Coordenadas EXACTAS del Local 9
  const address = locationSettings?.address || "Patios de, Av. 4b Nte. #58N-60 Local 9, Menga, Cali, Valle del Cauca, Colombia";
  const latitude = locationSettings?.latitude || 3.489348;
  const longitude = locationSettings?.longitude || -76.523183;
  
  const handleDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      '_blank'
    );
  };

  const handleOpenInMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      '_blank'
    );
  };

  if (loading) {
    return (
      <section id="map" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="map" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Nuestra <span className="text-gold">Ubicación</span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Nos encontramos en Cali, Colombia, en una ubicación privilegiada y de fácil acceso.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white p-4 rounded-2xl shadow-2xl">
              <iframe
                src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed&z=18`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Ubicación Dr Smile"
              />
            </div>
            
            <motion.button
              onClick={handleDirections}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-8 right-8 bg-gold text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              title="Obtener direcciones exactas"
            >
              <Navigation size={24} />
            </motion.button>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gold/10 p-3 rounded-full">
                  <MapPin className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">Dirección</h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gold/10 p-3 rounded-full">
                  <Clock className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">Horarios</h3>
                  <div className="text-charcoal/70 space-y-1">
                    <p>Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                    <p>Sábados: 8:00 AM - 2:00 PM</p>
                    <p>Domingos: Cerrado</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold/10 p-3 rounded-full">
                  <Phone className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">Contacto</h3>
                  <div className="space-y-2">
                    <p className="text-charcoal/70">📞 +57 316 6817878</p>
                    <p className="text-charcoal/70">📧 contacto@drsmile.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                onClick={handleDirections}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Navigation size={20} />
                Direcciones
              </motion.button>
              
              <motion.button
                onClick={handleOpenInMaps}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <MapPin size={20} />
                Ver en Maps
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;