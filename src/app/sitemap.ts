import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.erotikmassan.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = ['', '/artister', '/utstallare', '/boka-artist', '/biljetter', '/om-oss', '/kontakt']

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7,
  }))
}
