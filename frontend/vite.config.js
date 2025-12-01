import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirects any request starting with /api to your backend
      '/api': {
        target: 'http://127.0.0.1:8000', // Change port if your backend uses 8000
        changeOrigin: true,
        secure: false,
      }
    }
  }
})