import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'english4all-leeds',
  title: 'English4All Leeds CMS',

  projectId: 'weiash2x',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(), // GROQ query explorer — useful for debugging
  ],

  schema: {
    types: schemaTypes,
  },
})
