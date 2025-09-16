// src/components/admin/AdminDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from '../../hooks/useFirestore';
import { motion } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Phone,
  Image,
  MessageSquare,
  Settings,
} from 'lucide-react';

type StatCard = {
  title: string;
  count: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string; // tailwind bg- color class
  link: string;
};

const AdminDashboard: React.FC = () => {
  const { data: services } = useCollection('services', false);
  const { data: testimonials } = useCollection('testimonials', false);
  const { data: gallery } = useCollection('gallery', false);

  const stats: StatCard[] = [
    {
      title: 'Servicios',
      count: services.length,
      icon: Briefcase,
      color: 'bg-blue-500',
      link: '/admin/services',
    },
    {
      title: 'Testimonios',
      count: testimonials.length,
      icon: MessageSquare,
      color: 'bg-emerald-500',
      link: '/admin/testimonials',
    },
    {
      title: 'Galería',
      count: gallery.length,
      icon: Image, // ✅ corregido
      color: 'bg-purple-500',
      link: '/admin/gallery',
    },
    {
      title: 'Ubicación',
      count: 1,
      icon: MapPin,
      color: 'bg-orange-500',
      link: '/admin/location',
    },
    {
      title: 'Contacto',
      count: 1,
      icon: Phone,
      color: 'bg-teal-500',
      link: '/admin/contact',
    },
    {
      title: 'Ajustes',
      count: 1,
      icon: Settings,
      color: 'bg-gray-700',
      link: '/admin/settings',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de administración</h1>
          <p className="text-gray-600">
            Administra el contenido del sitio: servicios, galería, ubicación y más.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <Link to={item.link}>
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow group-hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-3xl font-bold text-gray-900">{item.count}</p>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${item.color}`}
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    Ir a {item.title.toLowerCase()}
                    <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
