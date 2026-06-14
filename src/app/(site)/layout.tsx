import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StructuredData } from '@/components/seo/StructuredData'
import { Analytics } from '@vercel/analytics/next'
import { getEvent } from '@/lib/content'

/**
 * Layout för själva sajten (allt utom /studio). Lägger till header, footer,
 * mörkt tema, SEO-structured-data och Analytics runt sidorna.
 */
// ISR: header/footer hämtar eventdata från Sanity var 60:e sekund.
export const revalidate = 60

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const event = await getEvent()
  return (
    <div className="min-h-full flex flex-col bg-ink text-cream">
      <StructuredData />
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:text-brand-pink focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Hoppa till innehållet
      </a>
      <Header event={event} />
      <main id="innehall" className="flex-1">{children}</main>
      <Footer event={event} />
      <Analytics />
    </div>
  )
}
