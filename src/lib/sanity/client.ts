import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { apiVersion, dataset, projectId, sanityConfigured } from '../../../sanity/env'

/**
 * Read-only Sanity-klient. Skapas bara om projektID finns – annars null,
 * och sidorna faller tillbaka på datafilerna i src/lib/data/.
 */
export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // useCdn:false → varje ISR-revalidering (var 60:e s) får färskt innehåll
      // från Sanity i stället för deras ev. fördröjda CDN-cache. Trafikvolymen
      // är låg så kostnaden är försumbar.
      useCdn: false,
    })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

/** Bygg en bild-URL från en Sanity-bildreferens. Returnerar null om ej konfigurerat. */
export function urlForImage(source: SanityImageSource | undefined): string | null {
  if (!builder || !source) return null
  return builder.image(source).auto('format').fit('max').url()
}
