import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StructuredData } from '@/components/seo/StructuredData'
import { Analytics } from '@vercel/analytics/next'

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

// Serif för en mer förtroendeingivande, "kontorsmässig" ton i rubriker/citat.
const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
})

/**
 * ROOT LAYOUT METADATA
 *
 * Global SEO-konfiguration för Wildkull Payroll AB
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || 'https://www.erotikmassan.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Erotikmässan | Lust · Kunskap · Livsnjutning',
    template: '%s | Erotikmässan',
  },
  description:
    'Erotikmässan 11–12 september 2026 i Globen, Stockholm. Möt artister och utställare, gå på föreläsningar och köp din biljett. Lust, kunskap och livsnjutning.',

  keywords: [
    'erotikmässan',
    'erotikmässa',
    'mässa Globen',
    'sexualitet',
    'biljetter erotikmässan',
    'utställare erotikmässan',
    'Stockholm mässa',
  ],

  authors: [{ name: 'Erotikmässan' }],
  creator: 'Erotikmässan',

  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: siteUrl,
    siteName: 'Erotikmässan',
    title: 'Erotikmässan | Lust · Kunskap · Livsnjutning',
    description:
      'Erotikmässan 11–12 september 2026 i Globen, Stockholm. Artister, utställare, föreläsningar och biljetter.',
    images: [
      {
        url: '/images/og/erotikmassan-og.png',
        width: 1200,
        height: 630,
        alt: 'Erotikmässan – Lust, kunskap och livsnjutning',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Erotikmässan | Lust · Kunskap · Livsnjutning',
    description:
      'Erotikmässan 11–12 september 2026 i Globen, Stockholm. Artister, utställare och biljetter.',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${jakarta.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:text-brand-pink focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Hoppa till innehållet
        </a>
        <Header />
        <main id="innehall" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
