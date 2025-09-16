import React from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from '/Users/nicolasgonzalez/Desktop/dr-smile/src/hooks/useFirestore.ts';
import { motion } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Phone,
  Images,
  MessageSquare,
  Settings
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { data: services } = useCollection('services', false);
  const { data: testimonials } = useCollection('testimonials', false);
  const { data: gallery } = useCollection('gallery', false);

  const stats = [
    {
      title: 'Servicios',
      count: services.length,
      icon: Briefcase,
      color: 'bg-blue-500',
      link: '/admin/services'
    },
    {
      title: 'Testimonios',
      count: testimonials.length,
      icon: MessageSquare,
      color: 'bg-green-500',
      link: '/admin/testimonials'
    },
    {
      title: 'Galería',
      count: gallery.length,
      icon: Images,
      color: 'bg-purple-500',
      link: '/admin/gallery'
    },
    {
      title: 'Configuración',
      count: 'OK',
      icon: Settings,
      color: 'bg-gold',
      link: '/admin/settings'
    }
  ];

  const quickActions = [
    {
      title: 'Gestionar Servicios',
      description: 'Agregar, editar o eliminar servicios odontológicos',
      icon: Briefcase,
      link: '/admin/services',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      title: 'Actualizar Ubicación',
      description: 'Modificar dirección y coordenadas del consultorio',
      icon: MapPin,
      link: '/admin/location',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      title: 'Información de Contacto',
      description: 'WhatsApp, teléfono y email de contacto',
      icon: Phone,
      link: '/admin/contact',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      title: 'Galería de Imágenes',
      description: 'Subir y organizar fotos del consultorio',
      icon: Images,
      link: '/admin/gallery',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600">
          Gestiona el contenido del sitio web de Dr Smile desde este panel de control.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={stat.link}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 block"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                  </div>
                  <div className={`${stat.color} rounded-full p-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={action.link}
                  className={`block p-4 rounded-lg border-2 transition-all duration-200 ${action.color}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Vista Previa del Sitio</h2>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Ver Sitio Web
          </a>
          <p className="text-sm text-gray-600">
            Los cambios que realices aquí se reflejarán automáticamente en el sitio web público.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;