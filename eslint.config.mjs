import antfu from '@antfu/eslint-config'
// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu(
    {
      // 1. General Settings
      formatters: true,
    },
    // 2. Custom Overrides (Ensures all your files are linted)
    {
      files: ['**/*.ts', '**/*.vue', '**/*.js', '**/*.mjs'],
      rules: {
        // Add custom rules here if needed
      },
    },
  ),
)
