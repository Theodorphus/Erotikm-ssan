import type { NextConfig } from "next";

/**
 * Säkerhetsheaders för alla sidor. Skyddar mot clickjacking, MIME-sniffning
 * och läckande referrer. CSP utelämnas medvetet – Sanity Studio (/studio) och
 * inline-JSON-LD kräver en mer omfattande policy och kan läggas till senare.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  // Dölj "X-Powered-By: Next.js" (mindre info till angripare).
  poweredByHeader: false,
  images: {
    // Next 16 kräver att icke-standard kvalitetsvärden tillåts explicit.
    // 90 används för skarpa hero-/foto-bakgrunder.
    qualities: [75, 90],
    // Bilder som ligger i Sanity (CMS) serveras från deras CDN.
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  /**
   * Omdirigeringar från den gamla Wix-sajtens URL:er (301, permanent).
   *
   * Endast sidor med en verklig motsvarighet här pekas om. Wix demobutik
   * (/shop och /product-page/jag-är-en-produkt*) får medvetet fortsätta ge
   * 404: att peka orelaterade sidor mot startsidan räknas som "soft 404" av
   * Google, ger inget värde och gör bara rapporten svårare att läsa. En 404
   * är rätt svar för en sida som aldrig borde ha funnits.
   *
   * 👉 Lägg till fler rader här om Search Console visar gamla adresser som
   *    faktiskt motsvarar en sida på den nya sajten.
   */
  async redirects() {
    return [
      // Gamla "kommande mässor"-sidan – sajten handlar nu om en mässa.
      { source: '/kommande-maessor', destination: '/', permanent: true },
      // Shows/uppträdanden presenteras numera under artisterna.
      { source: '/shows', destination: '/artister', permanent: true },
      // Lokal och adress ligger i "Praktiskt"-sektionen på startsidan.
      { source: '/venue', destination: '/#plats', permanent: true },
    ]
  },
};

export default nextConfig;
