-- Schema para guardar las respuestas del diagnóstico
CREATE TABLE IF NOT EXISTS diagnosticos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255),
  email VARCHAR(255),
  organizacion VARCHAR(255),
  rol VARCHAR(100),
  sector VARCHAR(100),
  pain_point VARCHAR(100),
  madurez VARCHAR(50),
  conocimiento_cert VARCHAR(100),
  objetivos TEXT[], -- Array de strings para múltiples objetivos
  score INTEGER,
  nivel VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_diagnosticos_email ON diagnosticos(email);

-- Índice para búsquedas por fecha
CREATE INDEX IF NOT EXISTS idx_diagnosticos_created_at ON diagnosticos(created_at);

