import React, { useState, useEffect } from 'react';
import { useSettings, useFirestoreCRUD } from '/Users/nicolasgonzalez/Desktop/dr-smile/src/hooks/useFirestore.ts';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Save, ExternalLink, Loader2, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
  published: boolean;
}

const LocationAdmin: React.FC = () => {
  const { settings: locationSettings, loading } = useSettings('location');
  const { updateDocument, createDocument } = useFirestoreCRUD('settings');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm<LocationData>({
    defaultValues: {
      address: '',
      latitude: 3.4516,
      longitude: -76.5320,
      published: true
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    if (locationSettings) {
      setValue('address', locationSettings.address || '');
      setValue('latitude', locationSettings.latitude || 3.4516);
      setValue('longitude', locationSettings.longitude || -76.5320);
      setValue('published', locationSettings.published ?? true);
    }
  }, [locationSettings, setValue]);

  const geocodeAddress = async () => {
    const address = watchedValues.address;
    if (!address.trim()) return;

    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setValue('latitude', lat);
        setValue('longitude', lng);
        console.log('Coordenadas obtenidas:', { lat, lng });
      } else {
        alert('No se pudieron obtener las coordenadas para esta dirección');
      }
    } catch (error) {
      console.error('Error geocoding:', error);
      alert('Error al obtener coordenadas');
    } finally {
      setIsGeocoding(false);
    }
  };

  const onSubmit = async (data: LocationData) => {
    setIsSubmitting(true);
    try {
      const locationData = {
        type: 'location',
        ...data,
        updatedAt: new Date()
      };

      if (locationSettings) {
        await updateDocument('location', locationData, locationSettings);
      } else {
        await createDocument({ id: 'location', ...locationData });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving location:', error);
      alert('Error al guardar la ubicación');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openInMaps = () => {
    const { latitude, longitude } = watchedValues;
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
  };

  const openDirections = () => {
    const { latitude, longitude } = watchedValues;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-4" />
          <p className="text-gray-600">Cargando configuración de ubicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ubicación</h1>
          <p className="text-gray-600">Configura la dirección y coordenadas del consultorio</p>
        </div>
        
        {saved && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200"
          >
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Guardado</span>
          </motion.div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección completa *
              </label>
              <div className="flex gap-3">
                <textarea
                  {...register('address', { required: 'La dirección es requerida' })}
                  rows={3}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                  placeholder="Ej: Patios de, Av. 4b Nte. #58N-60 Local 9, Menga, Cali, Valle del Cauca, Colombia"
                />
                <button
                  type="button"
                  onClick={geocodeAddress}
                  disabled={isGeocoding || !watchedValues.address?.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  {isGeocoding ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <MapPin size={16} />
                  )}
                  {isGeocoding ? 'Obteniendo...' : 'Geocodificar'}
                </button>
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitud *
                </label>
                <input
                  {...register('latitude', { required: 'La latitud es requerida', valueAsNumber: true })}
                  type="number"
                  step="any"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                  placeholder="3.4516"
                />
                {errors.latitude && (
                  <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitud *
                </label>
                <input
                  {...register('longitude', { required: 'La longitud es requerida', valueAsNumber: true })}
                  type="number"
                  step="any"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                  placeholder="-76.5320"
                />
                {errors.longitude && (
                  <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>
                )}
              </div>
            </div>

            {/* Test buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={openInMaps}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} />
                Ver en Maps
              </button>
              <button
                type="button"
                onClick={openDirections}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                <Navigation size={16} />
                Direcciones
              </button>
            </div>

            {/* Published toggle */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                {...register('published')}
                type="checkbox"
                id="published"
                className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-700">
                Publicar ubicación en el sitio web
              </label>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              
              {isDirty && (
                <p className="text-sm text-orange-600 flex items-center">
                  Hay cambios sin guardar
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa</h3>
          
          {watchedValues.latitude && watchedValues.longitude ? (
            <div className="space-y-4">
              {/* Map Preview */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps?q=${watchedValues.latitude},${watchedValues.longitude}&output=embed&z=17`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vista previa del mapa"
                />
              </div>

              {/* Location Info */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Dirección:</label>
                  <p className="text-gray-900">{watchedValues.address || 'No especificada'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Latitud:</label>
                    <p className="text-gray-900 font-mono text-sm">{watchedValues.latitude?.toFixed(6)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Longitud:</label>
                    <p className="text-gray-900 font-mono text-sm">{watchedValues.longitude?.toFixed(6)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-500">Estado:</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    watchedValues.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {watchedValues.published ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Ingresa coordenadas para ver la vista previa del mapa
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationAdmin;