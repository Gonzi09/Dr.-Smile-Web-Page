import React, { useState, useEffect } from 'react';
import { useSettings, useFirestoreCRUD } from '../../hooks/useFirestore';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, Save, Loader2, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactData {
  whatsapp: string;
  phone: string;
  email: string;
  published: boolean;
}

const ContactAdmin: React.FC = () => {
  const { settings: contactSettings, loading } = useSettings('contact');
  const { updateDocument, createDocument } = useFirestoreCRUD('settings');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm<ContactData>({
    defaultValues: {
      whatsapp: '+57316',
      phone: '+57316',
      email: '',
      published: true
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    if (contactSettings) {
      setValue('whatsapp', contactSettings.whatsapp || '+57316');
      setValue('phone', contactSettings.phone || '+57316');
      setValue('email', contactSettings.email || '');
      setValue('published', contactSettings.published ?? true);
    }
  }, [contactSettings, setValue]);

  const onSubmit = async (data: ContactData) => {
    setIsSubmitting(true);
    try {
      const contactData = {
        type: 'contact',
        ...data,
        updatedAt: new Date()
      };

      if (contactSettings) {
        await updateDocument('contact', contactData, contactSettings);
      } else {
        await createDocument({ id: 'contact', ...contactData });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Error al guardar la información de contacto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const testWhatsApp = () => {
    const message = encodeURIComponent('Hola! Estoy probando el contacto desde el admin de Dr Smile.');
    window.open(`https://wa.me/${watchedValues.whatsapp.replace('+', '')}?text=${message}`, '_blank');
  };

  const testCall = () => {
    window.location.href = `tel:${watchedValues.phone}`;
  };

  const testEmail = () => {
    window.location.href = `mailto:${watchedValues.email}?subject=Prueba desde Admin Dr Smile`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-4" />
          <p className="text-gray-600">Cargando información de contacto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacto</h1>
          <p className="text-gray-600">Configura la información de contacto del consultorio</p>
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
            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp *
              </label>
              <div className="flex gap-3">
                <input
                  {...register('whatsapp', { 
                    required: 'El número de WhatsApp es requerido',
                    pattern: {
                      value: /^\+\d{10,15}$/,
                      message: 'Formato: +573161234567'
                    }
                  })}
                  type="tel"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                  placeholder="+573161234567"
                />
                <button
                  type="button"
                  onClick={testWhatsApp}
                  disabled={!watchedValues.whatsapp}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  <MessageCircle size={16} />
                  Probar
                </button>
              </div>
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <div className="flex gap-3">
                <input
                  {...register('phone', { 
                    required: 'El teléfono es requerido',
                    pattern: {
                      value: /^\+\d{10,15}$/,
                      message: 'Formato: +573161234567'
                    }
                  })}
                  type="tel"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                  placeholder="+573161234567"
                />
                <button
                  type="button"
                  onClick={testCall}
                  disabled={!watchedValues.phone}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  <Phone size={16} />
                  Probar
                </button>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="flex gap-3">
                <input
                  {...register('email', { 
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email inválido'
                    }
                  })}
                  type="email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                  placeholder="contacto@drsmile.com"
                />
                <button
                  type="button"
                  onClick={testEmail}
                  disabled={!watchedValues.email}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  <Mail size={16} />
                  Probar
                </button>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
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
                Mostrar información de contacto en el sitio web
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
          
          <div className="space-y-4">
            {/* WhatsApp Preview */}
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">WhatsApp</p>
                  <p className="text-sm text-green-600">{watchedValues.whatsapp || 'No configurado'}</p>
                </div>
              </div>
            </div>

            {/* Phone Preview */}
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800">Teléfono</p>
                  <p className="text-sm text-blue-600">{watchedValues.phone || 'No configurado'}</p>
                </div>
              </div>
            </div>

            {/* Email Preview */}
            <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-purple-800">Email</p>
                  <p className="text-sm text-purple-600">{watchedValues.email || 'No configurado'}</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
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
      </div>
    </div>
  );
};

export default ContactAdmin;