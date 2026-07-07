/**
 * Renderar poster-HTML → PNG (+ PDF för final) med Playwright/Chromium.
 *
 * Kör:  npm run posters            (renderar alla)
 *       node scripts/render-posters.mjs final    (bara final-postern)
 *
 * Postrarna författas som självständiga HTML-filer i marketing/poster/ med
 * inbäddade bilder + fonter (base64). Det här scriptet renderar dem till
 * bild/PDF så texten (t.ex. artistnamn, öppettider) alltid speglar HTML:en.
 *
 * Kräver Chromium för Playwright:  npx playwright install chromium
 */
import { chromium } from 'playwright'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dir = resolve(root, 'marketing/poster')

/** width/height = renderad pixelupplösning (matchar respektive HTML-canvas). */
const POSTERS = [
  { name: 'final', html: 'poster-final-froken-snusk.html', out: 'poster-final-froken-snusk', width: 1856, height: 2304, pdf: true, dir },
  { name: 'a-neon', html: 'poster-a-neon.html', out: 'export/poster-a-neon', width: 1123, height: 1587, scale: 2, pdf: true, dir },
  { name: 'b-typo', html: 'poster-b-typo.html', out: 'export/poster-b-typo', width: 1123, height: 1587, scale: 2, pdf: true, dir },
  { name: 'c-fullbleed', html: 'poster-c-fullbleed.html', out: 'export/poster-c-fullbleed', width: 1123, height: 1587, scale: 2, pdf: true, dir },
  { name: 'd-polaroid', html: 'poster-d-polaroid.html', out: 'export/poster-d-polaroid', width: 1123, height: 1587, scale: 2, pdf: true, dir },
  { name: 'e-spotlight', html: 'poster-e-spotlight.html', out: 'export/poster-e-spotlight', width: 1123, height: 1587, scale: 2, pdf: true, dir },
]

const filter = process.argv[2]
const targets = filter ? POSTERS.filter((p) => p.name === filter) : POSTERS
if (targets.length === 0) {
  console.error(`Okänd poster "${filter}". Val: ${POSTERS.map((p) => p.name).join(', ')}`)
  process.exit(1)
}

const browser = await chromium.launch()
for (const t of targets) {
  const htmlPath = resolve(t.dir, t.html)
  if (!existsSync(htmlPath)) {
    console.warn(`  ⚠ hoppar över ${t.name} – saknar ${t.html}`)
    continue
  }
  const page = await browser.newPage({
    viewport: { width: t.width, height: t.height },
    deviceScaleFactor: t.scale ?? 1,
  })
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  const png = resolve(t.dir, `${t.out}.png`)
  await page.screenshot({ path: png, type: 'png' })
  console.log(`  ✓ ${t.name} → ${t.out}.png`)

  if (t.pdf) {
    const pdf = resolve(t.dir, `${t.out}.pdf`)
    await page.pdf({ path: pdf, width: `${t.width}px`, height: `${t.height}px`, printBackground: true })
    console.log(`  ✓ ${t.name} → ${t.out}.pdf`)
  }
  await page.close()
}
await browser.close()
console.log('Klart.')
