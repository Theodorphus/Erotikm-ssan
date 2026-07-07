/**
 * Uppdaterar Fröken Snusk + Alexander Guldtand i Sanity med rätt bilder
 * (och Guldtands text/länk). Sidan hämtar artister från Sanity, så det är
 * HÄR bilderna måste bytas – inte i src/lib/data/artists.ts (den är bara
 * fallback när Sanity saknar data).
 *
 * Kör:  node scripts/update-headliner-images.mjs
 *
 * Idempotent: laddar upp bild-assets och sätter image-referensen på de
 * fasta dokument-id:na. Rör inga andra artister.
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

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

/** Ladda upp en lokal bildfil som Sanity-asset och returnera dess _id. */
async function upload(relPath, label) {
  const abs = resolve(root, relPath)
  const buf = readFileSync(abs)
  const filename = relPath.split('/').pop()
  const asset = await client.assets.upload('image', buf, { filename })
  console.log(`  ✓ Laddade upp ${label} (${filename}) → ${asset._id}`)
  return asset._id
}

const UPDATES = [
  {
    _id: 'artist-froken-snusk',
    file: 'public/images/artists/froken-snusk.jpg',
    label: 'Fröken Snusk',
    // Text/länk lämnas orörda – bara bilden byts.
    patch: {},
  },
  {
    _id: 'artist-alexander-guldtand',
    file: 'public/images/artists/alexander-guldtand.jpg',
    label: 'Alex Guldtand',
    patch: {
      name: 'Alex Guldtand',
      role: 'Poddprofil',
      bio: 'Alex Guldtand har etablerat sig som en av Sveriges mest uppmärksammade poddprofiler, känd för sin raka, ofiltrerade intervjustil och sina möten med några av Sveriges mest välkända och färgstarka profiler inom vår kategori. Nu gästar han mässan tillsammans med sitt Club 24 Crew, där besökarna får chansen att träffa teamet och uppleva stämningen på nära håll.',
      link: 'https://www.instagram.com/guldtandspodcast',
    },
  },
]

console.log(`Uppdaterar headliners i ${projectId}/${dataset} …`)
for (const u of UPDATES) {
  const assetId = await upload(u.file, u.label)
  await client
    .patch(u._id)
    .set({
      ...u.patch,
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    })
    .commit()
  console.log(`  ✓ ${u.label}: bild + fält uppdaterade på ${u._id}`)
}
console.log('Klart! Ladda om /artister (ISR revaliderar inom 60 s).')
