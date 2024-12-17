import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
  server: {
    proxy: {
      "/api" : {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
