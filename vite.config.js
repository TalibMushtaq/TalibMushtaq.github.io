import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// User site (TalibMushtaq.github.io) is served from the domain root, so the
// default base '/' is correct. A project site would need base: '/<repo>/'.
export default defineConfig({
  // Vue SFC support replaces the former React plugin; the rest of the config
  // stays framework-agnostic so build output remains identical.
  plugins: [vue()],
})
