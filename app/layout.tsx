import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Diagnóstico Zero Waste | EcoNova',
  description: 'Descubre el potencial Zero Waste de tu organización en 5 minutos. Diagnóstico gratuito por EcoNova Environmental Consulting.',
  keywords: 'zero waste, sustentabilidad, certificación TRUE, economía circular, diagnóstico ambiental',
  authors: [{ name: 'EcoNova Environmental Consulting' }],
  openGraph: {
    title: 'Diagnóstico Zero Waste | EcoNova',
    description: 'Descubre el potencial Zero Waste de tu organización en 5 minutos.',
    type: 'website',
    locale: 'es_MX',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
