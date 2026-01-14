'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Download,
  Share2,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Clock,
  Star,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calculateScore, DiagnosticResult, getInsightFromAnswers } from '@/lib/scoring';
import { cn } from '@/lib/utils';

// URL del calendario de Google
const CALENDAR_URL = 'https://calendar.app.google/LDya3ZMQNdxLgKa89';

export default function ResultadosPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string | string[]> | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [insight, setInsight] = useState<string>('');
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('diagnostico_answers');
    if (!stored) {
      router.push('/diagnostico');
      return;
    }

    const parsedAnswers = JSON.parse(stored);
    setAnswers(parsedAnswers);
    
    const calculatedResult = calculateScore(parsedAnswers);
    setResult(calculatedResult);
    
    const calculatedInsight = getInsightFromAnswers(parsedAnswers);
    setInsight(calculatedInsight);

    // Animar score después de un delay
    setTimeout(() => setShowScore(true), 500);
  }, [router]);

  if (!result || !answers) {
    return (
      <div className="min-h-screen animated-gradient flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-econova-lime border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const levelColors = {
    transformacional: 'from-purple-500 to-pink-500',
    aceleracion: 'from-econova-lime to-green-400',
    optimizacion: 'from-blue-500 to-cyan-400',
    certificacion: 'from-yellow-400 to-orange-500',
  };

  const levelIcons = {
    transformacional: <Zap className="w-8 h-8" />,
    aceleracion: <TrendingUp className="w-8 h-8" />,
    optimizacion: <Target className="w-8 h-8" />,
    certificacion: <Trophy className="w-8 h-8" />,
  };

  const handleReset = () => {
    localStorage.removeItem('diagnostico_answers');
    router.push('/diagnostico');
  };

  return (
    <main className="min-h-screen animated-gradient">
      {/* Header */}
      <header className="px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/Logo-ECONOVA-OF_AzulSolido.png" 
              alt="EcoNova Logo" 
              className="h-10 md:h-12 w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleReset}
              className="p-2 text-gray-600 hover:text-econova-dark hover:bg-gray-100 rounded-lg transition-colors"
              title="Reiniciar diagnóstico"
            >
              <X className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-econova-dark hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-econova-dark hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Hero Result */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <p className="text-gray-700">
              ¡Gracias por completar el diagnóstico, <span className="text-econova-dark font-semibold">{answers.nombre}</span>!
            </p>

            {/* Score Circle */}
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-econova-dark"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 553' }}
                  animate={{ 
                    strokeDasharray: showScore 
                      ? `${(result.percentage / 100) * 553} 553` 
                      : '0 553' 
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b5e951" />
                    <stop offset="100%" stopColor="#7dd956" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-5xl font-bold text-econova-dark counter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {showScore ? result.percentage : 0}%
                </motion.span>
                <span className="text-gray-700 text-sm">Potencial</span>
              </div>
            </div>

            {/* Level Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className={cn(
                "inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r",
                levelColors[result.level]
              )}
            >
              {levelIcons[result.level]}
              <span className="text-white font-semibold text-lg">
                {result.levelLabel}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-800 max-w-xl mx-auto"
            >
              {result.levelDescription}
            </motion.p>
          </motion.section>

          {/* Insight Personal */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="glass-card rounded-2xl p-6 border-l-4 border-econova-lime"
          >
            <p className="text-econova-dark text-lg leading-relaxed">
              {insight}
            </p>
          </motion.section>

          {/* Certificaciones Recomendadas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="space-y-4"
          >
            <h2 className="text-econova-dark text-xl font-semibold flex items-center gap-2">
              <Star className="w-5 h-5 text-econova-lime" />
              Certificaciones Recomendadas
            </h2>
            
            <div className="grid gap-4">
              {result.certificationMatch.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-econova-dark font-semibold text-lg">{cert.name}</h3>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          cert.match >= 80 
                            ? "bg-econova-lime/20 text-econova-lime" 
                            : cert.match >= 60
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                        )}>
                          {cert.match}% match
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-3">{cert.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.pros.map((pro, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {pro}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gray-700 text-sm">
                        <Clock className="w-4 h-4" />
                        {cert.timeframe}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar del match */}
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-econova-lime to-green-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${cert.match}%` }}
                      transition={{ delay: 1.8 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Recomendaciones */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="space-y-4"
          >
            <h2 className="text-econova-dark text-xl font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-econova-lime" />
              Recomendaciones para tu Organización
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + index * 0.1 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{rec.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-econova-dark font-medium">{rec.title}</h3>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          rec.priority === 'alta' 
                            ? "bg-red-500/20 text-red-400"
                            : rec.priority === 'media'
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-gray-500/20 text-gray-400"
                        )}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{rec.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Próximos Pasos */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="space-y-4"
          >
            <h2 className="text-econova-dark text-xl font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-econova-lime" />
              Próximos Pasos
            </h2>

            <div className="glass-card rounded-xl p-6 space-y-4">
              {result.nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-econova-lime/20 text-econova-lime flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-gray-800">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Final */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6 }}
            className="text-center space-y-6 py-8"
          >
            <div className="glass-card rounded-2xl p-8 space-y-6">
              <h2 className="text-econova-dark text-2xl font-bold">
                ¿Listo para dar el siguiente paso?
              </h2>
              <p className="text-gray-700">
                Agenda una llamada de 30 minutos sin costo para revisar tu diagnóstico 
                y explorar las opciones para tu organización.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-econova-lime text-econova-dark font-semibold px-8 py-4 rounded-xl glow-lime hover:scale-105 transition-transform"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Llamada
                </a>
                <button className="inline-flex items-center justify-center gap-2 border border-gray-300 text-econova-dark px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors">
                  Enviar por Email
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-700 text-sm">
                También te enviaremos un resumen detallado a{' '}
                <span className="text-econova-dark font-medium">{answers.email}</span>
              </p>
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-700 text-sm">
              © 2024 EcoNova Environmental Consulting
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Consultores del primer campo de golf TRUE Platinum del mundo
            </p>
          </footer>

        </div>
      </div>
    </main>
  );
}
