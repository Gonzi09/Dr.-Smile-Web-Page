export interface Testimonial {
    id: string;
    name: string;
    text: string;
    rating: number;
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'María González',
      text: 'Increíble experiencia en Dr Smile. Mi ortodoncia invisible fue perfecta y el trato excepcional.',
      rating: 5
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      text: 'El diseño de sonrisa cambió mi vida completamente. Profesionales excelentes y resultados increíbles.',
      rating: 5
    },
    {
      id: '3',
      name: 'Ana Martín',
      text: 'Tratamiento de blanqueamiento fantástico. Recuperé la confianza en mi sonrisa.',
      rating: 5
    },
    {
      id: '4',
      name: 'José López',
      text: 'Las carillas de porcelana superaron mis expectativas. Dr Smile es sinónimo de calidad.',
      rating: 5
    }
  ];