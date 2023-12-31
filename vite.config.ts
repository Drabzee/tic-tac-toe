import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tic-tac-toe/',
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      injectRegister: null,
      registerType: 'autoUpdate',
      srcDir: 'src',
      filename: 'service-worker.ts',
      injectManifest: {
        injectionPoint: undefined
      },
      devOptions: {
        enabled: true,
        type: 'module'
      },
      manifest: {
        name: 'Tic-Tac-Toe',
        short_name: 'Tic-Tac-Toe',
        background_color: '#000000',
        theme_color: '#C84B31',
        orientation: 'portrait-primary',
        display: 'standalone',
        start_url: '/tic-tac-toe/',
        icons: [
          {
            src: '/tic-tac-toe/icons/icon-72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/tic-tac-toe/icons/icon-100.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/tic-tac-toe/icons/icon-128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/tic-tac-toe/icons/icon-144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/tic-tac-toe/icons/icon-152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/tic-tac-toe/icons/icon-196.png',
            sizes: '196x196',
            type: 'image/png'
          },
          {
            src: '/tic-tac-toe/icons/icon-256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/tic-tac-toe/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/tic-tac-toe/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/tic-tac-toe/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0'
  }
})
