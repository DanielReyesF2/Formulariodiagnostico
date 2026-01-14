# EcoNova - Diagnóstico Zero Waste

Aplicación interactiva de diagnóstico para evaluar el potencial Zero Waste de organizaciones.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar o descargar el proyecto
cd econova-diagnostico

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
econova-diagnostico/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Landing page
│   └── diagnostico/
│       ├── page.tsx        # Formulario interactivo
│       └── resultados/
│           └── page.tsx    # Página de resultados
├── lib/
│   ├── questions.ts        # Definición de preguntas
│   ├── scoring.ts          # Lógica de puntuación
│   └── utils.ts            # Utilidades
├── styles/
│   └── globals.css         # Estilos globales
└── public/                 # Assets estáticos
```

## ✨ Características

- **Flujo Conversacional**: Preguntas una a una con transiciones suaves
- **Pregunta de Reflexión**: "Pain point" que hace pensar al prospecto
- **Multi-Certificación**: Compara TRUE, UL 2799 e Intertek
- **Resultados Personalizados**: Score, recomendaciones y próximos pasos
- **Responsive**: Optimizado para móvil y desktop
- **Animaciones**: Transiciones elegantes con Framer Motion

## 🎨 Branding

**Colores:**
- Primario (Dark): `#273949`
- Acento (Lime): `#b5e951`
- Slate: `#1e2d3a`

## 🔧 Personalización

### Agregar/Modificar Preguntas
Edita `lib/questions.ts`:

```typescript
export const questions: Question[] = [
  {
    id: 'nueva_pregunta',
    type: 'cards', // text, cards, pain-point, scale, multi-select
    title: '¿Tu pregunta aquí?',
    options: [...],
  },
  // ...
];
```

### Ajustar Scoring
Modifica `lib/scoring.ts` para cambiar la lógica de puntuación y recomendaciones.

## 📦 Despliegue

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Build Manual
```bash
npm run build
npm start
```

## 🔮 Próximas Mejoras

- [ ] Integración con Supabase para persistencia
- [ ] Email automático con PDF de resultados
- [ ] Integración con Calendly/Cal.com
- [ ] Dashboard admin para ver leads
- [ ] A/B testing de preguntas

## 📄 Licencia

Propiedad de EcoNova Environmental Consulting.

---

Desarrollado con ❤️ para EcoNova
