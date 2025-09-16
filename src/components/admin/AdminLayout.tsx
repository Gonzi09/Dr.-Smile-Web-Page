import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Image,
  MessageSquare, 
  MapPin, 
  Phone, 
  Briefcase,
  LogOut, 
  Menu, 
  X,
  User,
  Shield,
  Activity
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { userData, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/admin',
      label: 'Dashboard',
      icon: Activity,
      exact: true
    },
    {
      path: '/admin/services',
      label: 'Servicios',
      icon: Briefcase
    },
    {
      path: '/admin/location',
      label: 'Ubicación',
      icon: MapPin
    },
    {
      path: '/admin/contact',
      label: 'Contacto',
      icon: Phone
    },
    {
      path: '/admin/gallery',
      label: 'Galería',
      icon: Image
    },
    {
      path: '/admin/testimonials',
      label: 'Testimonios',
      icon: MessageSquare
    },
    {
      path: '/admin/settings',
      label: 'Configuración',
      icon: Settings
    }
  ];

  const isActiveRoute = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 bg-charcoal border-b border-white/10">
          <h1 className="text-xl font-bold text-gold">Dr Smile Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* User info */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt={userData.displayName}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <p className="text-white font-medium">{userData?.displayName}</p>
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-gold" />
                <p className="text-xs text-gold uppercase">{userData?.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.path, item.exact);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-all duration-200 ${
                  isActive
                    ? 'bg-gold text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-semibold text-gray-900">Panel Admin</h2>
            <div className="w-6" />
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;