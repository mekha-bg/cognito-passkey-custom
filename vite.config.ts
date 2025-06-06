import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert', 'localhost+3-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert', 'localhost+3.pem')),
    },
    host: true,
    port: 5173,
  },
});
