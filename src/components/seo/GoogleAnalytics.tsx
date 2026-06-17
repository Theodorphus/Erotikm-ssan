import Script from 'next/script'

/**
 * Google Analytics 4 (GA4).
 *
 * Laddas ENDAST om miljövariabeln NEXT_PUBLIC_GA_ID är satt (t.ex. "G-XXXXXXXXXX").
 * Är den tom renderas ingenting – sajten fungerar precis som vanligt och inga
 * cookies sätts. Så här slår du på den:
 *   1. Skapa en GA4-property på https://analytics.google.com → kopiera Mät-ID:t
 *      (börjar med "G-").
 *   2. Lägg NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX i Vercel (Production) + .env.local.
 *   3. Deploya. Klart – ingen kodändring behövs.
 *
 * OBS (consent): GA4 sätter cookies. Innan den aktiveras skarpt i EU bör en
 * cookie-/samtyckesbanner finnas på plats. Den är medvetet inte byggd än –
 * beslutet tas innan GA faktiskt sätts på.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (!gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
