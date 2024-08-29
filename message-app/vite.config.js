import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix:"REACT_APP_",
  plugins: [
    react(),
    envCompatible(),

  ],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:4002',
        changeOrigin: true,
      }
    }
  }
})
