
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
})
