import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// User site (TalibMushtaq.github.io) is served from the domain root, so the
// default base '/' is correct. A project site would need base: '/<repo>/'.
export default defineConfig({
  plugins: [react()],
})
