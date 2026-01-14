export interface DiagnosticResult {
  score: number;
  maxScore: number;
  percentage: number;
  level: 'transformacional' | 'aceleracion' | 'optimizacion' | 'certificacion';
  levelLabel: string;
  levelDescription: string;
  recommendations: Recommendation[];
  certificationMatch: CertificationMatch[];
  nextSteps: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'alta' | 'media' | 'baja';
  icon: string;
}

export interface CertificationMatch {
  name: string;
  logo?: string;
  match: number;
  description: string;
  pros: string[];
  timeframe: string;
}

export interface Answers {
  [key: string]: string | string[];
}

export function calculateScore(answers: Answers): DiagnosticResult {
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Calcular score basado en respuestas
  const scoreMap: Record<string, number> = {
    // Pain point scores
    'no_se': 25,
    'dinero_mesa': 25,
    'sin_norte': 20,
    'validacion': 15,
    'certificacion': 10,
    
    // Madurez scores (inverso - menos maduro = más oportunidad)
    '1': 25,
    '2': 20,
    '3': 15,
    '4': 10,
    '5': 5,
    
    // Conocimiento cert (menos conocimiento = más oportunidad de educar)
    'ninguna': 20,
    'algunas': 15,
    'true': 10,
    'varias': 5,
  };

  // Score por pain point
  if (answers.pain_point && typeof answers.pain_point === 'string') {
    totalScore += scoreMap[answers.pain_point] || 0;
    maxPossibleScore += 25;
  }

  // Score por madurez
  if (answers.madurez && typeof answers.madurez === 'string') {
    totalScore += scoreMap[answers.madurez] || 0;
    maxPossibleScore += 25;
  }

  // Score por conocimiento
  if (answers.conocimiento_cert && typeof answers.conocimiento_cert === 'string') {
    totalScore += scoreMap[answers.conocimiento_cert] || 0;
    maxPossibleScore += 20;
  }

  // Score por objetivos (más objetivos = más engagement)
  if (answers.objetivos && Array.isArray(answers.objetivos)) {
    totalScore += Math.min(answers.objetivos.length * 5, 25);
    maxPossibleScore += 25;
  }

  // Score por sector (algunos sectores tienen más potencial)
  const highPotentialSectors = ['manufactura', 'hospitality', 'deportivo', 'logistica'];
  if (answers.sector && typeof answers.sector === 'string') {
    if (highPotentialSectors.includes(answers.sector)) {
      totalScore += 10;
    } else {
      totalScore += 5;
    }
    maxPossibleScore += 10;
  }

  const percentage = Math.round((totalScore / maxPossibleScore) * 100);
  
  // Determinar nivel
  let level: DiagnosticResult['level'];
  let levelLabel: string;
  let levelDescription: string;

  if (percentage >= 80) {
    level = 'transformacional';
    levelLabel = 'Oportunidad Transformacional';
    levelDescription = 'Tu organización tiene un potencial excepcional de transformación. Los beneficios de implementar una estrategia Zero Waste serían significativos.';
  } else if (percentage >= 60) {
    level = 'aceleracion';
    levelLabel = 'Listo para Acelerar';
    levelDescription = 'Ya tienes bases sólidas. Es momento de estructurar y acelerar tu camino hacia Zero Waste con las herramientas correctas.';
  } else if (percentage >= 40) {
    level = 'optimizacion';
    levelLabel = 'Optimización Estratégica';
    levelDescription = 'Tu organización está en buen camino. Con ajustes estratégicos puedes alcanzar el siguiente nivel de sustentabilidad.';
  } else {
    level = 'certificacion';
    levelLabel = 'Listo para Certificar';
    levelDescription = '¡Felicidades! Tu organización está madura para buscar certificación formal y validar su liderazgo ambiental.';
  }

  // Generar recomendaciones basadas en respuestas
  const recommendations = generateRecommendations(answers, level);
  
  // Match de certificaciones
  const certificationMatch = generateCertificationMatch(answers);
  
  // Próximos pasos
  const nextSteps = generateNextSteps(answers, level);

  return {
    score: totalScore,
    maxScore: maxPossibleScore,
    percentage,
    level,
    levelLabel,
    levelDescription,
    recommendations,
    certificationMatch,
    nextSteps,
  };
}

function generateRecommendations(answers: Answers, level: string): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Basado en pain point
  if (answers.pain_point === 'no_se' || answers.pain_point === 'dinero_mesa') {
    recommendations.push({
      title: 'Diagnóstico de Flujo de Materiales',
      description: 'Mapear todos los puntos de generación para identificar oportunidades ocultas de valor y reducción de costos.',
      priority: 'alta',
      icon: '🔍',
    });
  }

  if (answers.pain_point === 'sin_norte') {
    recommendations.push({
      title: 'Roadmap Zero Waste Personalizado',
      description: 'Diseñar una estrategia clara con hitos medibles y timeline realista para tu organización.',
      priority: 'alta',
      icon: '🗺️',
    });
  }

  // Basado en madurez
  if (answers.madurez === '1' || answers.madurez === '2') {
    recommendations.push({
      title: 'Implementación de Sistema de Separación',
      description: 'Establecer infraestructura básica de segregación en puntos clave de generación.',
      priority: 'alta',
      icon: '♻️',
    });
  }

  if (answers.madurez === '3' || answers.madurez === '4') {
    recommendations.push({
      title: 'Plataforma de Trazabilidad Digital',
      description: 'Implementar sistema de registro y monitoreo en tiempo real para optimizar decisiones.',
      priority: 'media',
      icon: '📊',
    });
  }

  // Basado en objetivos
  if (Array.isArray(answers.objetivos)) {
    if (answers.objetivos.includes('certificacion')) {
      recommendations.push({
        title: 'Evaluación de Brechas para Certificación',
        description: 'Análisis detallado de requisitos vs estado actual para determinar el camino más eficiente.',
        priority: 'alta',
        icon: '🎯',
      });
    }

    if (answers.objetivos.includes('ahorros')) {
      recommendations.push({
        title: 'Análisis de Valor Circular',
        description: 'Identificar streams de materiales con potencial de monetización o reducción de costos.',
        priority: 'media',
        icon: '💰',
      });
    }

    if (answers.objetivos.includes('esg')) {
      recommendations.push({
        title: 'Alineación con Framework ESG',
        description: 'Estructurar métricas e indicadores compatibles con reportes de sustentabilidad corporativa.',
        priority: 'media',
        icon: '🌍',
      });
    }
  }

  return recommendations.slice(0, 4); // Máximo 4 recomendaciones
}

function generateCertificationMatch(answers: Answers): CertificationMatch[] {
  const certifications: CertificationMatch[] = [];
  
  const madurez = answers.madurez as string;
  const sector = answers.sector as string;
  const objetivos = answers.objetivos as string[] || [];

  // TRUE - Mejor para organizaciones comprometidas a largo plazo
  let trueMatch = 70;
  if (madurez === '4' || madurez === '5') trueMatch += 15;
  if (objetivos.includes('certificacion')) trueMatch += 10;
  if (['deportivo', 'hospitality', 'corporativo'].includes(sector)) trueMatch += 5;
  
  certifications.push({
    name: 'TRUE (GBCI)',
    match: Math.min(trueMatch, 98),
    description: 'La certificación más reconocida globalmente. Enfoque holístico con 81 créditos posibles.',
    pros: ['Reconocimiento global', 'Metodología probada', 'Comunidad activa', 'Compatible con LEED'],
    timeframe: '6-12 meses',
  });

  // UL 2799 - Más flexible, bueno para manufactura
  let ul2799Match = 65;
  if (['manufactura', 'logistica'].includes(sector)) ul2799Match += 20;
  if (madurez === '3' || madurez === '4') ul2799Match += 10;
  
  certifications.push({
    name: 'UL 2799',
    match: Math.min(ul2799Match, 95),
    description: 'Estándar técnico enfocado en validación de tasas de desvío. Ideal para manufactura.',
    pros: ['Proceso más directo', 'Enfoque cuantitativo', 'Reconocido en industria', 'Auditoría rigurosa'],
    timeframe: '4-8 meses',
  });

  // Intertek - Bueno para empresas que buscan flexibilidad
  let intertekMatch = 60;
  if (objetivos.includes('esg')) intertekMatch += 15;
  if (madurez === '2' || madurez === '3') intertekMatch += 10;
  
  certifications.push({
    name: 'Intertek Zero Waste',
    match: Math.min(intertekMatch, 90),
    description: 'Certificación con opciones de niveles progresivos. Buena entrada al mundo Zero Waste.',
    pros: ['Niveles progresivos', 'Soporte técnico', 'Flexibilidad', 'Costo competitivo'],
    timeframe: '3-6 meses',
  });

  // Ordenar por match
  return certifications.sort((a, b) => b.match - a.match);
}

function generateNextSteps(answers: Answers, level: string): string[] {
  const steps: string[] = [];

  steps.push('Revisión de resultados con especialista EcoNova (30 min, sin costo)');

  if (level === 'transformacional' || level === 'aceleracion') {
    steps.push('Diagnóstico presencial de puntos de generación');
    steps.push('Propuesta de roadmap personalizado');
  }

  if (level === 'optimizacion') {
    steps.push('Análisis de brechas vs certificación objetivo');
    steps.push('Demo de Plataforma de Trazabilidad EcoNova');
  }

  if (level === 'certificacion') {
    steps.push('Evaluación de documentación existente');
    steps.push('Timeline y presupuesto para certificación');
  }

  steps.push('Definición de siguiente fase de colaboración');

  return steps;
}

export function getInsightFromAnswers(answers: Answers): string {
  const painPoint = answers.pain_point as string;
  const nombre = answers.nombre as string;
  
  const insights: Record<string, string> = {
    'no_se': `${nombre}, la falta de visibilidad es el primer obstáculo que debemos resolver. Sin datos precisos, es imposible tomar decisiones estratégicas sobre residuos.`,
    'dinero_mesa': `${nombre}, tu intuición es correcta. Organizaciones similares han descubierto que hasta el 40% de sus "residuos" tienen valor recuperable.`,
    'sin_norte': `${nombre}, tener clara la oportunidad pero no el camino es muy común. La buena noticia: existe una metodología probada para estructurar esto.`,
    'validacion': `${nombre}, ya tienes el trabajo duro hecho. Una certificación externa validará tu esfuerzo y abrirá nuevas oportunidades de negocio.`,
    'certificacion': `${nombre}, estás listo para el siguiente nivel. Vamos a encontrar la certificación que mejor se alinee con tus objetivos.`,
  };

  return insights[painPoint] || `${nombre}, tu organización tiene potencial significativo para mejorar su gestión de residuos.`;
}
