export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
  }
  
  export const services: Service[] = [
    {
      id: 'ortodoncia-tradicional',
      title: 'Ortodoncia tradicional e invisible',
      description: 'Corrige la posición de tus dientes con brackets tradicionales o invisibles para una sonrisa perfecta.',
      icon: '🦷'
    },
    {
      id: 'diseno-sonrisa',
      title: 'Diseño de sonrisa',
      description: 'Transformamos tu sonrisa con técnicas avanzadas para lograr la armonía dental perfecta.',
      icon: '✨'
    },
    {
      id: 'blanqueamiento',
      title: 'Blanqueamiento',
      description: 'Recupera el color natural de tus dientes con tratamientos de blanqueamiento profesional.',
      icon: '⚡'
    },
    {
      id: 'porcelain-veneers',
      title: 'Porcelain Veneers',
      description: 'Carillas de porcelana ultra finas para corregir forma, color y posición dental.',
      icon: '💎'
    },
    {
      id: 'armonia-orofacial',
      title: 'Armonía orofacial',
      description: 'Tratamientos estéticos faciales que complementan tu sonrisa para un rostro armonioso.',
      icon: '🌟'
    },
    {
      id: 'ortopedia-maxilar',
      title: 'Ortodoncia y ortopedia maxilar',
      description: 'Corrección de problemas de crecimiento y desarrollo maxilar en niños y adultos.',
      icon: '🔧'
    },
    {
      id: 'odontologia-general',
      title: 'Odontología general',
      description: 'Cuidado dental completo: limpiezas, empastes, extracciones y mantenimiento oral.',
      icon: '🏥'
    }
  ];