import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/log-in" : {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      },
      "/api/sign-up" : {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
