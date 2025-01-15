/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { UserConfigExport } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    EnvironmentPlugin({
      VITE_API_URL: 'http://localhost:8080',
      VITE_REDIRECT_URI: 'http://localhost:8080/login/callback',
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setUpFiles: './src/setUpTests.ts'
  }
} as UserConfigExport)
