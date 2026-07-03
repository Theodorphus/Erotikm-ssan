/**
 * Riktad uppdatering: lägger till Fröken Snusk (plats 1) och Alexander
 * Guldtand (plats 2) överst i artistlistan och skjuter ner övriga.
 * Rör inget annat innehåll. (Johans mejl 2026-07-03.)
 *
 * Kör:  node --import tsx scripts/add-headliners.mjs
 *
 * Idempotent: createOrReplace på fasta _id:n + omnumrering av order.
 * Bilder läggs på separat i Studio när Johan skickat pressbilder.
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// Läs .env.local manuellt (inga extra beroenden).
for (const line of readFileSync(resolve(root, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Saknar NEXT_PUBLIC_SANITY_PROJECT_ID eller SANITY_WRITE_TOKEN i .env.local.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-10-01', useCdn: false })

const HEADLINERS = [
  {
    _id: 'artist-froken-snusk',
    name: 'Fröken Snusk',
    slug: 'froken-snusk',
    role: 'Mässans gästartist',
    bio: 'Sveriges mest omtalade maskerade popfenomen intar stora scenen. Hitmakerskan bakom de virala succéerna – ingen vet vem hon är, alla vet vad hon levererar. Mässans stora dragplåster.',
    link: 'https://www.instagram.com/frokensnusk',
    order: 0,
  },
  {
    _id: 'artist-alexander-guldtand',
    name: 'Alexander Guldtand',
    slug: 'alexander-guldtand',
    role: 'Liveartist',
    bio: 'Epadunk-profilen med guldtanden gästar mässan och sätter fart på dansgolvet med sina festhits.',
    link: null, // ❓ Instagram-länk ej bekräftad av Johan än
    order: 1,
  },
]

// Skjut ner befintliga artister två steg (behåll inbördes ordning).
const existing = await client.fetch(
  '*[_type == "artist" && !(_id in $ids)]|order(order asc){_id, name}',
  { ids: HEADLINERS.map((h) => h._id) },
)

const tx = client.transaction()
HEADLINERS.forEach((h) => {
  tx.createOrReplace({
    _type: 'artist',
    _id: h._id,
    name: h.name,
    slug: { _type: 'slug', current: h.slug },
    role: h.role,
    bio: h.bio,
    ...(h.link ? { link: h.link } : {}),
    order: h.order,
  })
})
existing.forEach((a, i) => {
  tx.patch(a._id, { set: { order: i + 2 } })
})

await tx.commit()
console.log(
  `Klart! Fröken Snusk (0) + Alexander Guldtand (1) inlagda, ${existing.length} befintliga omnumrerade (2–${existing.length + 1}) i ${projectId}/${dataset}.`,
)
