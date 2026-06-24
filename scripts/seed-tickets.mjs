/**
 * Riktad uppdatering: skriver ENBART biljett-dokumenten till Sanity.
 * Rör inte artister, utställare, FAQ eller eventInfo.
 *
 * Kör:  node --import tsx scripts/seed-tickets.mjs
 *
 * Idempotent: ticket-0..N skrivs med createOrReplace. Eventuella gamla
 * ticket-dokument med högre index (om listan krympt) raderas så inga
 * föräldralösa biljetter blir kvar.
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const importFile = (p) => import(pathToFileURL(resolve(root, p)).href)

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

const { TICKET_TYPES } = await importFile('src/lib/data/tickets.ts')

// Befintliga ticket-id:n i datasetet (för att städa bort överflödiga).
const existingIds = await client.fetch('*[_type == "ticket"]._id')

const tx = client.transaction()
TICKET_TYPES.forEach((t, i) => {
  tx.createOrReplace({
    _id: `ticket-${i}`,
    _type: 'ticket',
    name: t.name,
    price: t.price,
    description: t.description,
    perks: t.perks,
    badge: t.badge,
    featured: !!t.featured,
    group: t.group,
    order: i,
  })
})

// Radera gamla ticket-dokument som inte längre täcks av listan.
const keep = new Set(TICKET_TYPES.map((_, i) => `ticket-${i}`))
const toDelete = existingIds.filter((id) => !keep.has(id))
for (const id of toDelete) tx.delete(id)

await tx.commit()
console.log(
  `Klart! Skrev ${TICKET_TYPES.length} biljetter` +
    (toDelete.length ? `, raderade ${toDelete.length} gamla (${toDelete.join(', ')})` : '') +
    ` till Sanity (${projectId}/${dataset}).`,
)
