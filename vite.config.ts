import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config — builds to /dist for static hosting (S3/CloudFront)
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
