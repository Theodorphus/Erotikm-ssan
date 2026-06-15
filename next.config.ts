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
};

export default nextConfig;
