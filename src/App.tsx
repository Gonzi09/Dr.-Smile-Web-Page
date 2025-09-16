import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

// Componentes públicos
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Map from './components/Map';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Componentes de admin
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/ServicesAdmin';
import ServicesAdmin from './components/admin/ServicesAdmin';
import LocationAdmin from './components/admin/LocationAdmin';
import ContactAdmin from './components/admin/ContactAdmin';

// Importar estilos (ajusta la ruta según tu estructura)
import './styles/globals.css'; 

// Componente de sitio público
const PublicSite: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Map />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

// Página simple para rutas que aún no existen
const ComingSoon: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600">Esta sección estará disponible pronto.</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicSite />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rutas de admin protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="location" element={<LocationAdmin />} />
            <Route path="contact" element={<ContactAdmin />} />
            <Route path="gallery" element={<ComingSoon title="Galería" />} />
            <Route path="testimonials" element={<ComingSoon title="Testimonios" />} />
            <Route path="settings" element={<ComingSoon title="Configuración" />} />
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={
            <div className="min-h-screen bg-charcoal flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gold mb-4">404</h1>
                <p className="text-white mb-6">Página no encontrada</p>
                <a href="/" className="btn-primary">
                  Volver al inicio
                </a>
              </div>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;