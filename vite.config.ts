import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { viteAdminApiPlugin } from './scripts/vite-admin-api.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['ADMIN_PASSWORD', 'ADMIN_SESSION_SECRET'] as const) {
    if (env[key] && !process.env[key]) {
      process.env[key] = env[key]
    }
  }

  return {
    plugins: [react(), tailwindcss(), viteAdminApiPlugin()],
  }
})
