/**
 * Sanity Studio inbäddad på /studio.
 * Detta är admin-panelen där Johan redigerar sajtens innehåll.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Studion är en interaktiv klient-app (Sanitys admin), inte statiskt innehåll.
// force-static gjorde att den tomma catch-all-rutten (/studio) 404:ade i
// produktion på Vercel – force-dynamic renderar on-demand och löser det.
export const dynamic = 'force-dynamic'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
