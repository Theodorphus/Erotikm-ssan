/**
 * Sanity-miljövariabler. Sätt dessa i .env.local (se .env.local.example).
 * `projectId` får du när du skapat ett projekt på sanity.io.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

/** True när Sanity är konfigurerat – styr om sidorna läser från CMS eller datafiler. */
export const sanityConfigured = projectId.length > 0
