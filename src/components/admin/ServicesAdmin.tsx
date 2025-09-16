import React, { useState } from 'react';
import { useCollection, useFirestoreCRUD } from '../../hooks/useFirestore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Sparkles
} from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Service {
  id: string;
  title: string;
  description: string;
  emoji: string;
  animation: string;
  active: boolean;
  published: boolean;
  order: number;
}

interface ServiceFormData {
  title: string;
  description: string;
  emoji: string;
  animation: string;
  active: boolean;
  published: boolean;
}

const animationOptions = [
  { value: 'bounce', label: 'Rebote' },
  { value: 'pulse', label: 'Pulso' },
  { value: 'float', label: 'Flotante' },
  { value: 'spin', label: 'Giro' },
  { value: 'shake', label: 'Vibración' },
  { value: 'scale', label: 'Escala' }
];

const ServicesAdmin: React.FC = () => {
  const { data: services, loading } = useCollection('services', false);
  const { createDocument, updateDocument, deleteDocument } = useFirestoreCRUD('services');
  
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ServiceFormData>();

  const handleCreateService = () => {
    setEditingService(null);
    reset({
      title: '',
      description: '',
      emoji: '🦷',
      animation: 'bounce',
      active: true,
      published: true
    });
    setShowForm(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    reset({
      title: service.title,
      description: service.description,
      emoji: service.emoji,
      animation: service.animation,
      active: service.active,
      published: service.published
    });
    setShowForm(true);
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      const serviceData = {
        ...data,
        order: editingService?.order ?? services.length + 1
      };

      if (editingService) {
        await updateDocument(editingService.id, serviceData, editingService);
      } else {
        await createDocument(serviceData);
      }

      setShowForm(false);
      reset();
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (service: Service) => {
    if (window.confirm(`¿Estás seguro de eliminar el servicio "${service.title}"?`)) {
      try {
        await deleteDocument(service.id);
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const toggleServiceStatus = async (service: Service, field: 'active' | 'published') => {
    try {
      const updatedData = { ...service, [field]: !service[field] };
      await updateDocument(service.id, updatedData, service);
    } catch (error) {
      console.error(`Error updating service ${field}:`, error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Servicios</h1>
          <p className="text-gray-600">Gestiona los servicios odontológicos del sitio web</p>
        </div>
        <motion.button
          onClick={handleCreateService}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Servicio
        </motion.button>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service: Service) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{service.emoji}</span>
                      <div>
                        <p className="font-medium text-gray-900">{service.title}</p>
                        <p className="text-sm text-gray-500">Animación: {service.animation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs truncate">
                      {service.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleServiceStatus(service, 'active')}
                        className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          service.active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {service.active ? 'Activo' : 'Inactivo'}
                      </button>
                      <button
                        onClick={() => toggleServiceStatus(service, 'published')}
                        className={`p-1 rounded-full transition-colors ${
                          service.published
                            ? 'text-green-600 hover:bg-green-100'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={service.published ? 'Publicado' : 'Borrador'}
                      >
                        {service.published ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <motion.button
                        onClick={() => handleEditService(service)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteService(service)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay servicios</h3>
            <p className="text-gray-600 mb-4">Comienza agregando tu primer servicio odontológico</p>
            <button onClick={handleCreateService} className="btn-primary">
              <Plus size={20} className="mr-2" />
              Crear Primer Servicio
            </button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título *
                    </label>
                    <input
                      {...register('title', { required: 'El título es requerido' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="Nombre del servicio"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      {...register('description', { required: 'La descripción es requerida' })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="Descripción del servicio..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emoji *
                    </label>
                    <input
                      {...register('emoji', { required: 'El emoji es requerido' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="🦷"
                    />
                    {errors.emoji && (
                      <p className="text-red-500 text-sm mt-1">{errors.emoji.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Animación *
                    </label>
                    <select
                      {...register('animation', { required: 'La animación es requerida' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      {animationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.animation && (
                      <p className="text-red-500 text-sm mt-1">{errors.animation.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        {...register('active')}
                        type="checkbox"
                        id="active"
                        className="rounded border-gray-300 text-gold focus:ring-gold"
                      />
                      <label htmlFor="active" className="text-sm text-gray-700">
                        Activo
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        {...register('published')}
                        type="checkbox"
                        id="published"
                        className="rounded border-gray-300 text-gold focus:ring-gold"
                      />
                      <label htmlFor="published" className="text-sm text-gray-700">
                        Publicado
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      {editingService ? 'Actualizar' : 'Crear'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesAdmin;