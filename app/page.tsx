'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Leaf, BarChart3, Award, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <img 
              src="/Logo-ECONOVA-OF_AzulSolido.png" 
              alt="EcoNova Logo" 
              className="h-16 md:h-20 w-auto"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-gray-800 text-sm">
            <Clock className="w-4 h-4" />
            <span>5 minutos</span>
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-econova-dark mb-6 leading-tight"
          >
            ¿Listo para estructurar y fortalecer la{' '}
            <span className="text-econova-lime">sustentabilidad</span> en tu organización?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-900 mb-12 max-w-2xl mx-auto"
          >
            Descubre el potencial Zero Waste de tu empresa en solo 5 minutos. 
            Te mostraremos el camino más eficiente hacia la certificación.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/diagnostico">
              <button className="group relative inline-flex items-center gap-3 bg-econova-lime text-econova-dark font-semibold text-lg px-8 py-4 rounded-xl glow-lime transition-all duration-300 hover:scale-105">
                Comenzar Diagnóstico
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Análisis Inteligente"
              description="Evaluamos tu situación actual y potencial de mejora basado en datos reales."
              delay={0.7}
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Multi-Certificación"
              description="Comparamos TRUE, UL 2799 e Intertek para encontrar tu mejor opción."
              delay={0.8}
            />
            <FeatureCard
              icon={<Leaf className="w-8 h-8" />}
              title="Roadmap Personalizado"
              description="Recibe recomendaciones específicas para tu sector e industria."
              delay={0.9}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-gray-800 mb-6">
            Sin compromiso • Resultados inmediatos • 100% confidencial
          </p>
          <Link href="/diagnostico">
            <button className="inline-flex items-center gap-2 text-econova-lime hover:text-econova-dark transition-colors">
              Comenzar ahora
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-xl p-6 hover:scale-105 transition-transform duration-300"
    >
      <div className="w-14 h-14 bg-econova-lime/10 rounded-xl flex items-center justify-center text-econova-lime mb-4">
        {icon}
      </div>
      <h3 className="text-econova-dark font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-800 text-sm">{description}</p>
    </motion.div>
  );
}
