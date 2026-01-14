export interface Question {
  id: string;
  type: 'text' | 'select' | 'cards' | 'scale' | 'multi-select' | 'pain-point';
  title: string;
  subtitle?: string;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
}

export interface Option {
  id: string;
  label: string;
  emoji?: string;
  description?: string;
  value: number;
}

export const questions: Question[] = [
  {
    id: 'nombre',
    type: 'text',
    title: '¡Hola! 👋',
    subtitle: '¿Cuál es tu nombre?',
    placeholder: 'Escribe tu nombre...',
    required: true,
  },
  {
    id: 'organizacion',
    type: 'text',
    title: '¿En qué organización trabajas, {{nombre}}?',
    placeholder: 'Nombre de tu empresa u organización...',
    required: true,
  },
  {
    id: 'rol',
    type: 'cards',
    title: '¿Cuál es tu rol?',
    subtitle: 'Selecciona el que mejor describa tu posición',
    options: [
      { id: 'sustentabilidad', label: 'Sustentabilidad', emoji: '🌱', description: 'Director/Gerente de Sustentabilidad', value: 5 },
      { id: 'operaciones', label: 'Operaciones', emoji: '⚙️', description: 'Gerente de Operaciones / Facility', value: 4 },
      { id: 'clevel', label: 'C-Level', emoji: '👔', description: 'CEO, COO, CFO, Director General', value: 5 },
      { id: 'ehs', label: 'EHS', emoji: '🛡️', description: 'Seguridad, Higiene y Medio Ambiente', value: 4 },
      { id: 'compras', label: 'Compras', emoji: '📦', description: 'Compras / Supply Chain', value: 3 },
      { id: 'otro', label: 'Otro', emoji: '💼', description: 'Otro rol', value: 2 },
    ],
    required: true,
  },
  {
    id: 'sector',
    type: 'cards',
    title: '¿En qué sector opera tu organización?',
    options: [
      { id: 'manufactura', label: 'Manufactura', emoji: '🏭', value: 5 },
      { id: 'retail', label: 'Retail / Comercio', emoji: '🛒', value: 4 },
      { id: 'hospitality', label: 'Hoteles / Restaurantes', emoji: '🏨', value: 5 },
      { id: 'deportivo', label: 'Clubes / Deportivo', emoji: '⛳', value: 5 },
      { id: 'corporativo', label: 'Oficinas Corporativas', emoji: '🏢', value: 3 },
      { id: 'educacion', label: 'Educación', emoji: '🎓', value: 4 },
      { id: 'salud', label: 'Salud', emoji: '🏥', value: 4 },
      { id: 'logistica', label: 'Logística / Almacenes', emoji: '📦', value: 5 },
      { id: 'otro', label: 'Otro', emoji: '🏗️', value: 3 },
    ],
    required: true,
  },
  {
    id: 'pain_point',
    type: 'pain-point',
    title: 'Reflexiona un momento...',
    subtitle: 'Si pudieras medir el verdadero costo de tus residuos —no solo lo que pagas por recolección, sino el impacto ambiental, la reputación, las oportunidades perdidas de economía circular— ¿crees que tu organización está tomando las decisiones correctas?',
    options: [
      { id: 'no_se', label: 'Honestamente, no lo sé', emoji: '🤔', description: 'No tenemos visibilidad clara', value: 5 },
      { id: 'dinero_mesa', label: 'Estamos dejando dinero en la mesa', emoji: '💸', description: 'Sé que hay oportunidades perdidas', value: 5 },
      { id: 'sin_norte', label: 'Hay oportunidad, pero no sabemos por dónde empezar', emoji: '🧭', description: 'Necesitamos dirección', value: 4 },
      { id: 'validacion', label: 'Medimos todo, necesitamos validación externa', emoji: '✅', description: 'Estamos listos para certificar', value: 3 },
      { id: 'certificacion', label: 'Queremos certificación/reconocimiento', emoji: '🏆', description: 'Listos para el siguiente nivel', value: 2 },
    ],
    required: true,
  },
  {
    id: 'madurez',
    type: 'scale',
    title: '¿Dónde te encuentras en tu camino hacia Zero Waste?',
    subtitle: 'Selecciona el nivel que mejor describa tu situación actual',
    options: [
      { id: '1', label: 'Inicio', emoji: '🌱', description: 'Sin separación ni medición de residuos', value: 1 },
      { id: '2', label: 'Básico', emoji: '📊', description: 'Separación básica de algunos materiales', value: 2 },
      { id: '3', label: 'Intermedio', emoji: '♻️', description: 'Reciclaje activo con medición parcial', value: 3 },
      { id: '4', label: 'Avanzado', emoji: '📈', description: 'Trazabilidad completa con +70% de desvío', value: 4 },
      { id: '5', label: 'Líder', emoji: '🏆', description: '+90% de desvío, listos para certificación', value: 5 },
    ],
    required: true,
  },
  {
    id: 'conocimiento_cert',
    type: 'cards',
    title: '¿Conoces las certificaciones Zero Waste disponibles?',
    subtitle: 'Existen varios caminos para validar tu compromiso ambiental',
    options: [
      { id: 'ninguna', label: 'No conozco ninguna', emoji: '❓', description: '¿Cuáles existen?', value: 5 },
      { id: 'algunas', label: 'He escuchado de algunas', emoji: '👂', description: 'Pero no en detalle', value: 4 },
      { id: 'true', label: 'Conozco TRUE', emoji: '🎯', description: 'La certificación de GBCI', value: 3 },
      { id: 'varias', label: 'Conozco varias', emoji: '📚', description: 'TRUE, UL 2799, Intertek...', value: 2 },
    ],
    required: true,
  },
  {
    id: 'objetivos',
    type: 'multi-select',
    title: '¿Qué te gustaría lograr?',
    subtitle: 'Puedes seleccionar más de una opción',
    options: [
      { id: 'certificacion', label: 'Certificación Zero Waste', emoji: '🏆', description: 'TRUE, UL 2799, Intertek', value: 5 },
      { id: 'trazabilidad', label: 'Sistema de medición digital', emoji: '📊', description: 'Trazabilidad en tiempo real', value: 4 },
      { id: 'estrategia', label: 'Estrategia de economía circular', emoji: '♻️', description: 'Diseño e implementación', value: 4 },
      { id: 'comite', label: 'Crear comité de sustentabilidad', emoji: '👥', description: 'Estructura organizacional y gobernanza', value: 4 },
      { id: 'ahorros', label: 'Identificar ahorros', emoji: '💰', description: 'Nuevas fuentes de valor', value: 3 },
      { id: 'esg', label: 'Cumplir objetivos ESG', emoji: '🌍', description: 'Metas corporativas', value: 3 },
      { id: 'orientacion', label: 'No estoy seguro', emoji: '🧭', description: 'Necesito orientación', value: 5 },
    ],
    required: true,
  },
  {
    id: 'email',
    type: 'text',
    title: '¡Excelente, {{nombre}}!',
    subtitle: '¿Dónde te compartimos tu diagnóstico personalizado?',
    placeholder: 'tu@email.com',
    required: true,
  },
];

export const getQuestionById = (id: string): Question | undefined => {
  return questions.find(q => q.id === id);
};
