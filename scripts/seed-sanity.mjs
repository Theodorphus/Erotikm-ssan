/**
 * Migrerar befintligt innehåll från datafilerna till Sanity.
 *
 * Körs EN gång när Sanity-projektet är uppsatt:
 *   1. Skapa projekt på sanity.io → notera projectId.
 *   2. Lägg projectId i .env.local (NEXT_PUBLIC_SANITY_PROJECT_ID).
 *   3. Skapa en write-token i Sanity (API → Tokens, role: Editor) och
 *      lägg den som SANITY_WRITE_TOKEN i .env.local.
 *   4. Kör:  npm run seed   (= node --import tsx scripts/seed-sanity.mjs)
 *
 * Scriptet är idempotent: dokument får fasta _id:n och skrivs med createOrReplace,
 * så att köra det igen skapar inga dubbletter. Bilder laddas upp som assets.
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** Dynamisk import av en lokal fil – på Windows krävs file://-URL. */
const importFile = (p) => import(pathToFileURL(resolve(root, p)).href)
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

// Importera datafilerna direkt – .ts läses via tsx, som laddas med
// `node --import tsx` (se npm-scriptet "seed"). På Node 20.6+/24 är detta
// rätt sätt; den gamla register('tsx/esm') deprekerades.
const { EVENT } = await importFile('src/lib/data/event.ts')
const { ARTISTS } = await importFile('src/lib/data/artists.ts')
const { EXHIBITORS } = await importFile('src/lib/data/exhibitors.ts')
const { TICKET_TYPES } = await importFile('src/lib/data/tickets.ts')
const { FAQ_ITEMS } = await importFile('src/lib/data/faq.ts')

/** Ladda upp en lokal /public-bild som Sanity-asset, eller null om den saknas. */
async function uploadImage(relPath) {
  if (!relPath) return null
  const file = resolve(root, 'public', relPath.replace(/^\//, ''))
  if (!existsSync(file)) {
    console.warn('  (bild saknas, hoppar över:', relPath, ')')
    return null
  }
  const asset = await client.assets.upload('image', readFileSync(file), {
    filename: relPath.split('/').pop(),
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  const docs = []

  // Mässans info (singleton).
  docs.push({
    _id: 'eventInfo',
    _type: 'eventInfo',
    dateText: EVENT.dateText,
    startDate: EVENT.startDate,
    endDate: EVENT.endDate,
    openingHours: EVENT.openingHours,
    guestArtistName: EVENT.guestArtist.name,
    guestArtistText: EVENT.guestArtist.text,
    ticketsUrl: EVENT.links.tickets,
    bookArtistUrl: EVENT.links.bookArtist,
    facebookUrl: EVENT.links.facebook,
    instagramUrl: EVENT.links.instagram,
    tiktokUrl: EVENT.links.tiktok,
  })

  // Artister (med bilduppladdning).
  for (let i = 0; i < ARTISTS.length; i++) {
    const a = ARTISTS[i]
    console.log('Artist:', a.name)
    const image = await uploadImage(a.image)
    docs.push({
      _id: `artist-${a.slug}`,
      _type: 'artist',
      name: a.name,
      slug: { _type: 'slug', current: a.slug },
      role: a.role,
      bio: a.bio,
      link: a.link,
      order: i,
      ...(image ? { image } : {}),
    })
  }

  // Utställare.
  for (let i = 0; i < EXHIBITORS.length; i++) {
    const e = EXHIBITORS[i]
    const image = await uploadImage(e.image)
    docs.push({
      _id: `exhibitor-${e.slug}`,
      _type: 'exhibitor',
      name: e.name,
      slug: { _type: 'slug', current: e.slug },
      description: e.description,
      website: e.website,
      order: i,
      ...(image ? { image } : {}),
    })
  }

  // Biljetter.
  TICKET_TYPES.forEach((t, i) => {
    docs.push({
      _id: `ticket-${i}`,
      _type: 'ticket',
      name: t.name,
      price: t.price,
      description: t.description,
      perks: t.perks,
      badge: t.badge,
      featured: !!t.featured,
      order: i,
    })
  })

  // FAQ.
  FAQ_ITEMS.forEach((f, i) => {
    docs.push({
      _id: `faq-${i}`,
      _type: 'faqItem',
      question: f.question,
      answer: f.answer,
      order: i,
    })
  })

  const tx = client.transaction()
  for (const doc of docs) tx.createOrReplace(doc)
  await tx.commit()
  console.log(`\nKlart! Skrev ${docs.length} dokument till Sanity (${projectId}/${dataset}).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
