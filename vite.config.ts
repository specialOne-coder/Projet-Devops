/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      beacon: 'taquito/beacon-wallet/dist/taquito-beacon-wallet.es6.js',
      "readable-stream": "vite-compatible-readable-stream",
      stream: "vite-compatible-readable-stream"
    },
  },
})
