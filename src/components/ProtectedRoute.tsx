import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { Loader2, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, userData, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-gold mx-auto mb-4" />
          <p className="text-white text-lg">Verificando acceso...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Denegado</h2>
          <p className="text-white/70 mb-6">
            No tienes permisos de administrador para acceder a esta sección.
          </p>
          <p className="text-sm text-white/50">
            Usuario: {userData?.email}
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 btn-secondary"
          >
            Volver
          </button>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;