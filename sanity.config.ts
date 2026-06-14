'use client'

/**
 * Konfiguration för Sanity Studio – admin-panelen som ligger inbäddad på
 * sajten under /studio. Johan loggar in där och redigerar artister,
 * utställare, biljetter, tider och FAQ.
 */
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Erotikmässan – innehåll',
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
})
