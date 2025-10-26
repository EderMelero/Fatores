import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Importe 'path' e 'fileURLToPath'
import path from 'path'
import { fileURLToPath } from 'url'

// Crie as variáveis __filename e __dirname manualmente
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // O atalho '@' agora vai funcionar
      "@": path.resolve(__dirname, "./src"),
    },
  },
})