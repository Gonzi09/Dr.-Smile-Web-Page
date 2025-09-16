import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { Loader2, Shield, Chrome } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { user, signInWithGoogle, loading, error } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-charcoal to-gold/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-charcoal mb-2">
            Dr Smile Admin
          </h1>
          <p className="text-charcoal/60">
            Panel de administración del sitio web
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <p className="text-red-600 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Login Form */}
        <div className="space-y-6">
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={isSigningIn || loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isSigningIn ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Chrome className="w-5 h-5 text-blue-500" />
            )}
            <span className="font-medium text-gray-700">
              {isSigningIn ? 'Iniciando sesión...' : 'Continuar con Google'}
            </span>
          </motion.button>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Solo para administradores</p>
                <p>
                  Necesitas permisos de administrador para acceder al panel de control.
                  Contacta al propietario si necesitas acceso.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Dr Smile. Sistema de administración seguro.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;