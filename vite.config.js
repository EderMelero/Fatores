import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Fatores/', // Verifique se o nome do repo está correto
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // --- ADICIONE ESTE BLOCO ---
  build: {
    outDir: 'docs' // Define a pasta de saída como 'docs'
  }
  // --- FIM DO BLOCO ---
})