/**
 * Sanity Studio inbäddad på /studio.
 * Detta är admin-panelen där Johan redigerar sajtens innehåll.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
