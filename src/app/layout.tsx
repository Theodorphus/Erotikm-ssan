import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['700', '800'],
})

// Serif för en mer förtroendeingivande ton i rubriker/citat.
const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
})

/**
 * ROOT LAYOUT – endast <html>/<body> + globala typsnitt.
 * Sajtens chrome (Header/Footer/SEO/mörkt tema) ligger i (site)/layout.tsx,
 * så att /studio (Sanity-admin) kan rendera helt utan sajtens layout.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || 'https://www.erotikmassan.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Erotikmässan | Lust · Spänning · Livsnjutning',
    template: '%s | Erotikmässan',
  },
  description:
    'Erotikmässan 11–12 september 2026 i Globen, Stockholm. Originalet – Sveriges första och största erotik- & tattoomässa sedan 1996. Scenshower, utställare, tatuering och biljetter.',
  alternates: { canonical: '/' },
  keywords: [
    'erotikmässan',
    'erotikmässa',
    'fair erotica',
    'mässa Globen',
    'Stockholm mässa',
    'erotik och tattoo',
    'biljetter erotikmässan',
    'utställare erotikmässan',
    'tatueringsmässa',
  ],
  authors: [{ name: 'Erotikmässan' }],
  creator: 'Erotikmässan',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: siteUrl,
    siteName: 'Erotikmässan',
    title: 'Erotikmässan | Lust · Spänning · Livsnjutning',
    description:
      'Erotikmässan 11–12 september 2026 i Globen, Stockholm. Originalet sedan 1996 – artister, utställare, tatuering, scenshower och biljetter.',
    images: [
      {
        url: '/images/og/erotikmassan-og.png',
        width: 1200,
        height: 630,
        alt: 'Erotikmässan – Lust, spänning och livsnjutning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Erotikmässan | Lust · Spänning · Livsnjutning',
    description:
      'Erotikmässan 11–12 september 2026 i Globen, Stockholm. Originalet sedan 1996 – artister, utställare, tatuering och biljetter.',
    images: ['/images/og/erotikmassan-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B0B0F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${jakarta.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
