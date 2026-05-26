import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'english4all-leeds',
  title: 'English4All Leeds CMS',

  projectId: 'weiash2x',
  dataset: 'production',

  plugins: [
    structureTool({
      // Simplified structure for better performance
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Activities')
              .child(
                S.documentTypeList('activity')
                  .title('Activities')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),
            S.listItem()
              .title('Arc Social Events')
              .child(
                S.documentTypeList('arcEvent')
                  .title('Arc Social Events')
                  .defaultOrdering([{ field: 'date', direction: 'asc' }])
              ),
          ]),
    }),
    // Removed visionTool to reduce bundle size and improve performance
  ],

  schema: {
    types: schemaTypes,
  },

  // Performance optimizations
  document: {
    // Reduce the number of revisions kept in memory
    unstable_languageFilter: [],
  },
})
