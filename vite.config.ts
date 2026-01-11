import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { execSync } from 'child_process'

// https://vite.dev/config/
export default defineConfig({
  base: '/gym-grid/',
  plugins: [
    {
      name: "generate fixtures",
      buildStart() {
        execSync("npm run fixtures", { stdio: "inherit" });
      },
    },
    react(), 
    svgr()
  ],
})
