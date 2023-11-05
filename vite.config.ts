import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tic-tac-toe/',
  plugins: [react()],
  server: {
    host: '0.0.0.0'
  }
})