# Configuración de Base de Datos

## Paso 1: Crear la tabla en Neon

1. Ve a tu proyecto en [Neon Console](https://console.neon.tech)
2. Abre el SQL Editor
3. Ejecuta el siguiente script SQL (también está en `schema.sql`):

```sql
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
  objetivos TEXT[],
  score INTEGER,
  nivel VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_diagnosticos_email ON diagnosticos(email);
CREATE INDEX IF NOT EXISTS idx_diagnosticos_created_at ON diagnosticos(created_at);
```

## Paso 2: Configurar Variable de Entorno en Railway

1. Ve a tu proyecto en Railway
2. Ve a Settings → Variables
3. Agrega una nueva variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Tu connection string de Neon (la que obtuviste del modal de Neon)

El connection string se ve así:
```
postgresql://usuario:password@host/database?sslmode=require
```

## Paso 3: Variables de Entorno Locales (desarrollo)

Crea un archivo `.env.local` en la raíz del proyecto:

```env
DATABASE_URL=postgresql://usuario:password@host/database?sslmode=require
```

**Nota**: No subas el archivo `.env.local` a GitHub (ya está en `.gitignore`).

## Verificación

Una vez configurado:
1. Ejecuta el diagnóstico en tu aplicación
2. Completa el formulario
3. Verifica en Neon que los datos se hayan guardado en la tabla `diagnosticos`

