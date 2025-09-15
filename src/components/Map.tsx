import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock, Loader2 } from 'lucide-react';

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 3.4516, // Coordenadas por defecto de Cali
    lng: -76.5320
  });
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  const address = "Patios de, Av. 4b Nte. #58N-60 Local 9, Menga, Cali, Valle del Cauca, Colombia";
  
  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        setIsLoading(true);
        
        // Usar Nominatim (OpenStreetMap) - Gratuito y sin API key
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          setCoordinates({ lat, lng });
          console.log('Coordenadas precisas obtenidas:', { lat, lng });
        } else {
          // Fallback: buscar solo "Menga, Cali, Colombia" si la dirección completa no se encuentra
          const fallbackResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=Menga,Cali,Colombia`
          );
          const fallbackData = await fallbackResponse.json();
          
          if (fallbackData && fallbackData.length > 0) {
            const lat = parseFloat(fallbackData[0].lat);
            const lng = parseFloat(fallbackData[0].lon);
            setCoordinates({ lat, lng });
            console.log('Coordenadas de Menga obtenidas:', { lat, lng });
          }
        }
      } catch (error) {
        console.error('Error al obtener coordenadas:', error);
        setMapError(true);
      } finally {
        setIsLoading(false);
      }
    };

    geocodeAddress();
  }, []);
  
  const handleDirections = () => {
    // Usar las coordenadas exactas para direcciones más precisas
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`,
      '_blank'
    );
  };

  const handleOpenInMaps = () => {
    // Abrir Google Maps con coordenadas exactas
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`,
      '_blank'
    );
  };

  const handleStreetView = () => {
    // Abrir Street View con coordenadas exactas
    window.open(
      `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coordinates.lat},${coordinates.lng}`,
      '_blank'
    );
  };

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
              {isLoading ? (
                <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-xl">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-gold" />
                    <p className="text-charcoal/60">Obteniendo ubicación precisa...</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500.5!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM${Math.abs(coordinates.lat).toFixed(6)}°${coordinates.lat >= 0 ? 'N' : 'S'}+${Math.abs(coordinates.lng).toFixed(6)}°${coordinates.lng >= 0 ? 'E' : 'W'}!5e0!3m2!1sen!2sco!4v${Date.now()}`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                  title="Ubicación exacta Dr Smile"
                />
              )}
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
                    Patios de, Av. 4b Nte. #58N-60 Local 9<br />
                    Menga, Cali<br />
                    Valle del Cauca, Colombia
                  </p>
                  {!isLoading && (
                    <p className="text-xs text-gold mt-2 font-mono">
                      📍 GPS: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                    </p>
                  )}
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.button
                onClick={handleDirections}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center gap-2 text-sm"
                disabled={isLoading}
              >
                <Navigation size={16} />
                Direcciones
              </motion.button>
              
              <motion.button
                onClick={handleOpenInMaps}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center justify-center gap-2 text-sm"
                disabled={isLoading}
              >
                <MapPin size={16} />
                Ver en Maps
              </motion.button>

              <motion.button
                onClick={handleStreetView}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm transition-all duration-300"
                disabled={isLoading}
              >
                👁️ Street View
              </motion.button>
            </div>

            {mapError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">
                  No se pudo obtener la ubicación exacta. Usando coordenadas aproximadas de Cali.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Map;