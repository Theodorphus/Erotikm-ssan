import type { MetadataRoute } from 'next'

/**
 * Web App Manifest – ger sajten ett namn/ikon när den sparas på hemskärm
 * och bidrar till bättre tekniskt SEO. Färgerna följer varumärkespaletten.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Erotikmässan',
    short_name: 'Erotikmässan',
    description:
      'Erotikmässan 11–12 september 2026 i Ekebo, Munka-Ljungby. Originalet sedan 1996.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0B0F',
    theme_color: '#E11D74',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
