import React, { useState, useEffect } from 'react';
import { useSettings, useFirestoreCRUD } from '../../hooks/useFirestore';
import { useImageUpload } from '../../hooks/useImageUpload';
import { motion } from 'framer-motion';
import { User, Upload, Save, Loader2, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface DoctorData {
  name: string;
  title: string;
  bio: string;
  philosophy: string;
  yearsExperience: string;
  imageUrl: string;
  published: boolean;
}

const DoctorAdmin: React.FC = () => {
  const { settings: doctorSettings, loading } = useSettings('doctor');
  const { updateDocument, createDocument } = useFirestoreCRUD('settings');
  const { uploadImage, isUploading, uploads } = useImageUpload();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm<DoctorData>({
    defaultValues: {
      name: '',
      title: '',
      bio: '',
      philosophy: '',
      yearsExperience: '20+',
      imageUrl: '',
      published: true
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    if (doctorSettings) {
      setValue('name', doctorSettings.name || '');
      setValue('title', doctorSettings.title || '');
      setValue('bio', doctorSettings.bio || '');
      setValue('philosophy', doctorSettings.philosophy || '');
      setValue('yearsExperience', doctorSettings.yearsExperience || '20+');
      setValue('imageUrl', doctorSettings.imageUrl || '');
      setValue('published', doctorSettings.published ?? true);
      setImagePreview(doctorSettings.imageUrl || '');
    }
  }, [doctorSettings, setValue]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Mostrar preview inmediato
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Subir a Firebase Storage
      const url = await uploadImage(file, 'hero', `doctor-${Date.now()}`);
      setValue('imageUrl', url, { shouldDirty: true });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen');
    }
  };

  const onSubmit = async (data: DoctorData) => {
    setIsSubmitting(true);
    try {
      const doctorData = {
        type: 'doctor',
        ...data,
        updatedAt: new Date()
      };

      if (doctorSettings) {
        await updateDocument('doctor', doctorData, doctorSettings);
      } else {
        await createDocument({ id: 'doctor', ...doctorData });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving doctor info:', error);
      alert('Error al guardar la información');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-4" />
          <p className="text-gray-600">Cargando información de la doctora...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sobre la Doctora</h1>
          <p className="text-gray-600">Edita la información y foto de la especialista</p>
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
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto de la Doctora *
              </label>
              
              <div className="flex flex-col items-center gap-4">
                {imagePreview ? (
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gold">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 rounded-full bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                <label className="btn-secondary cursor-pointer flex items-center gap-2">
                  <Upload size={16} />
                  {isUploading ? 'Subiendo...' : 'Cambiar Foto'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>

                {isUploading && (
                  <div className="w-full">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-gold h-2 rounded-full transition-all duration-300" style={{ width: '50%' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo *
              </label>
              <input
                {...register('name', { required: 'El nombre es requerido' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                placeholder="Dra. Marcela García"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título profesional *
              </label>
              <input
                {...register('title', { required: 'El título es requerido' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                placeholder="Odontóloga Especialista"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biografía (primer párrafo) *
              </label>
              <textarea
                {...register('bio', { required: 'La biografía es requerida' })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                placeholder="Educación, especialidades, años de experiencia..."
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
              )}
            </div>

            {/* Philosophy */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filosofía profesional (segundo párrafo) *
              </label>
              <textarea
                {...register('philosophy', { required: 'La filosofía es requerida' })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                placeholder="Filosofía de trabajo, enfoque con pacientes..."
              />
              {errors.philosophy && (
                <p className="text-red-500 text-sm mt-1">{errors.philosophy.message}</p>
              )}
            </div>

            {/* Years Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Años de experiencia
              </label>
              <input
                {...register('yearsExperience')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                placeholder="20+"
              />
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
                Mostrar sección en el sitio web
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
            {/* Image Preview */}
            {imagePreview ? (
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gold mx-auto">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-full bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center mx-auto">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}

            {/* Content Preview */}
            <div className="space-y-4 pt-4">
              <div>
                <h4 className="text-2xl font-bold text-gold">{watchedValues.name || 'Nombre de la doctora'}</h4>
                <p className="text-lg text-gray-600">{watchedValues.title || 'Título profesional'}</p>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {watchedValues.bio || 'Biografía de la doctora...'}
              </p>

              <p className="text-sm text-gray-700 leading-relaxed">
                {watchedValues.philosophy || 'Filosofía profesional...'}
              </p>

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

      {/* Help */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Consejos</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Usa una foto profesional de alta calidad (mínimo 800x800px)</li>
          <li>• La biografía debe ser clara y destacar experiencia y formación</li>
          <li>• La filosofía debe conectar emocionalmente con los pacientes</li>
          <li>• Los cambios se reflejan inmediatamente en el sitio web</li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAdmin;