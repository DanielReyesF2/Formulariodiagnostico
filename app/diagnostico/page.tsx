'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Leaf, Send, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { questions, Question } from '@/lib/questions';
import { calculateScore } from '@/lib/scoring';
import { cn } from '@/lib/utils';

export default function DiagnosticoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastQuestion = currentStep === questions.length - 1;

  // Interpolar el nombre en las preguntas
  const interpolateTitle = (title: string) => {
    return title.replace('{{nombre}}', (answers.nombre as string) || 'amigo');
  };

  const handleNext = async () => {
    if (isAnimating) return;
    
    // Validar respuesta requerida
    const answer = answers[currentQuestion.id];
    if (currentQuestion.required && (!answer || (Array.isArray(answer) && answer.length === 0))) {
      return;
    }

    if (isLastQuestion) {
      // Calcular score y nivel
      const result = calculateScore(answers);
      
      try {
        // Guardar en la base de datos
        const response = await fetch('/api/diagnostico', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers,
            score: result.percentage,
            nivel: result.level,
          }),
        });

        if (!response.ok) {
          console.error('Error al guardar en la base de datos');
        }
      } catch (error) {
        console.error('Error al guardar diagnóstico:', error);
        // Continuar aunque falle el guardado en BD
      }

      // Guardar en localStorage (fallback) y navegar a resultados
      localStorage.setItem('diagnostico_answers', JSON.stringify(answers));
      router.push('/diagnostico/resultados');
      return;
    }

    setDirection(1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (isAnimating || currentStep === 0) return;
    
    setDirection(-1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleAnswer = (value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentQuestion.type === 'text') {
      handleNext();
    }
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (!currentQuestion.required) return true;
    if (Array.isArray(answer)) return answer.length > 0;
    return !!answer;
  };

  return (
    <main className="min-h-screen animated-gradient relative overflow-hidden flex flex-col">
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/Logo-ECONOVA-OF_AzulSolido.png" 
              alt="EcoNova Logo" 
              className="h-10 md:h-12 w-auto"
            />
          </div>
          <span className="text-gray-800 text-sm">
            {currentStep + 1} de {questions.length}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="relative z-10 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="h-1 bg-econova-dark/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-econova-lime progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Question Title */}
              <div className="text-center space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-econova-dark">
                  {interpolateTitle(currentQuestion.title)}
                </h1>
                {currentQuestion.subtitle && (
                  <p className={cn(
                    "text-gray-700",
                    currentQuestion.type === 'pain-point' ? "text-lg max-w-xl mx-auto leading-relaxed" : "text-lg"
                  )}>
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              {/* Question Input */}
              <div onKeyPress={handleKeyPress}>
                {currentQuestion.type === 'text' && (
                  <TextInput
                    value={(answers[currentQuestion.id] as string) || ''}
                    onChange={(value) => handleAnswer(value)}
                    placeholder={currentQuestion.placeholder}
                    isEmail={currentQuestion.id === 'email'}
                  />
                )}

                {currentQuestion.type === 'cards' && (
                  <CardOptions
                    options={currentQuestion.options || []}
                    selected={answers[currentQuestion.id] as string}
                    onSelect={(value) => handleAnswer(value)}
                  />
                )}

                {currentQuestion.type === 'pain-point' && (
                  <PainPointOptions
                    options={currentQuestion.options || []}
                    selected={answers[currentQuestion.id] as string}
                    onSelect={(value) => handleAnswer(value)}
                  />
                )}

                {currentQuestion.type === 'scale' && (
                  <ScaleOptions
                    options={currentQuestion.options || []}
                    selected={answers[currentQuestion.id] as string}
                    onSelect={(value) => handleAnswer(value)}
                  />
                )}

                {currentQuestion.type === 'multi-select' && (
                  <MultiSelectOptions
                    options={currentQuestion.options || []}
                    selected={(answers[currentQuestion.id] as string[]) || []}
                    onSelect={(value) => handleAnswer(value)}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <footer className="relative z-10 px-6 py-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:text-econova-dark hover:bg-gray-100"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
              canProceed()
                ? "bg-econova-lime text-econova-dark glow-lime hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            {isLastQuestion ? (
              <>
                Ver Resultados
                <Send className="w-4 h-4" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </footer>
    </main>
  );
}

// Text Input Component
function TextInput({ 
  value, 
  onChange, 
  placeholder,
  isEmail 
}: { 
  value: string; 
  onChange: (value: string) => void;
  placeholder?: string;
  isEmail?: boolean;
}) {
  return (
    <div className="max-w-md mx-auto">
      <input
        type={isEmail ? 'email' : 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
        className="w-full bg-transparent border-b-2 border-gray-300 focus:border-econova-lime text-econova-dark text-2xl text-center py-4 placeholder:text-gray-400 transition-colors outline-none"
      />
      <p className="text-gray-700 text-sm text-center mt-4">
        Presiona Enter para continuar
      </p>
    </div>
  );
}

// Card Options Component
function CardOptions({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; label: string; emoji?: string; description?: string }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(option.id)}
          className={cn(
            "option-card glass-card rounded-xl p-4 text-left",
            selected === option.id && "selected"
          )}
        >
          <span className="text-2xl mb-2 block">{option.emoji}</span>
          <span className="text-econova-dark font-medium block">{option.label}</span>
          {option.description && (
            <span className="text-gray-700 text-xs mt-1 block">{option.description}</span>
          )}
          {selected === option.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-5 h-5 bg-econova-lime rounded-full flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-econova-dark" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// Pain Point Question Component (destacada)
function PainPointOptions({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; label: string; emoji?: string; description?: string }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-3 max-w-xl mx-auto">
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(option.id)}
          className={cn(
            "option-card w-full glass-card rounded-xl p-5 text-left flex items-center gap-4 relative overflow-hidden",
            selected === option.id && "selected"
          )}
        >
          <span className="text-3xl flex-shrink-0">{option.emoji}</span>
          <div className="flex-1">
            <span className="text-econova-dark font-medium block">{option.label}</span>
            {option.description && (
              <span className="text-gray-700 text-sm mt-1 block">{option.description}</span>
            )}
          </div>
          {selected === option.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 bg-econova-lime rounded-full flex items-center justify-center flex-shrink-0"
            >
              <Check className="w-4 h-4 text-econova-dark" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// Scale Options Component
function ScaleOptions({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; label: string; emoji?: string; description?: string }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex justify-between gap-2 max-w-2xl mx-auto">
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(option.id)}
            className={cn(
              "flex-1 rounded-xl flex flex-col items-center justify-center transition-all p-3 min-h-[120px]",
              selected === option.id
                ? "bg-econova-lime text-econova-dark scale-105"
                : "glass-card text-econova-dark hover:scale-105"
            )}
        >
          <span className="text-2xl mb-1">{option.emoji}</span>
          <span className="text-xs font-semibold mb-1">{option.id}</span>
          <span className={cn(
            "text-xs text-center leading-tight",
            selected === option.id ? "text-econova-dark font-medium" : "text-gray-700"
          )}>
            {option.description}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// Multi Select Options Component
function MultiSelectOptions({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; label: string; emoji?: string; description?: string }[];
  selected: string[];
  onSelect: (value: string[]) => void;
}) {
  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter(s => s !== id));
    } else {
      onSelect([...selected, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => toggleOption(option.id)}
          className={cn(
            "option-card glass-card rounded-xl p-4 text-left flex items-center gap-3 relative",
            selected.includes(option.id) && "selected"
          )}
        >
          <div className={cn(
            "w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all",
            selected.includes(option.id)
              ? "bg-econova-lime border-econova-lime"
              : "border-gray-500"
          )}>
            {selected.includes(option.id) && (
              <Check className="w-4 h-4 text-econova-dark" />
            )}
          </div>
          <span className="text-xl flex-shrink-0">{option.emoji}</span>
          <div className="flex-1 min-w-0">
            <span className="text-econova-dark font-medium block truncate">{option.label}</span>
            {option.description && (
              <span className="text-gray-700 text-xs block truncate">{option.description}</span>
            )}
          </div>
        </motion.button>
      ))}
      <p className="col-span-full text-center text-gray-700 text-sm mt-2">
        Selecciona todas las que apliquen
      </p>
    </div>
  );
}
