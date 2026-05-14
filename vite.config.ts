import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config — builds to /dist for static hosting on Cloudflare Pages
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Optimize for Cloudflare Pages
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          sanity: ['@sanity/client', '@sanity/image-url'],
        },
      },
    },
  },
})
