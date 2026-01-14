# Instrucciones para Deployment en Railway

## 1. Subir a GitHub

Después de crear el repositorio en GitHub, ejecuta:

```bash
git remote add origin https://github.com/TU-USUARIO/econova-diagnostico.git
git branch -M main
git push -u origin main
```

## 2. Configurar Railway

1. Ve a [Railway](https://railway.app)
2. Crea una cuenta o inicia sesión
3. Click en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Conecta tu cuenta de GitHub y selecciona el repositorio `econova-diagnostico`
6. Railway detectará automáticamente que es un proyecto Next.js

## 3. Variables de Entorno (si las necesitas)

En Railway, ve a tu proyecto → Settings → Variables y agrega:
- `NEXT_PUBLIC_CALENDAR_URL` (opcional, ya está en el código)

## 4. Build Settings

Railway debería detectar automáticamente:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18+ (se detecta automáticamente)

## 5. Deploy

Railway desplegará automáticamente. El dominio se generará automáticamente y podrás verlo en la pestaña "Settings" → "Domains".

## Notas

- El link del calendario ya está configurado en el código: `https://calendar.app.google/LDya3ZMQNdxLgKa89`
- Si necesitas cambiarlo, edita `app/diagnostico/resultados/page.tsx` línea 25

