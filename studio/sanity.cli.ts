/**
 * studio/sanity.cli.ts
 *
 * Sanity CLI configuration.
 * Required for `sanity deploy` to know which project to deploy to.
 * The Studio will be hosted at: https://english4all-leeds.sanity.studio
 */
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'weiash2x',
    dataset: 'production',
  },
  studioHost: 'english4all-leeds', // → https://english4all-leeds.sanity.studio
})
