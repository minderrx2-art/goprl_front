import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
  plugins: [tailwindcss(), svelte(), svelteTesting()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests.ts'],
    globals: true
  },
  server: {
    proxy: {
      '/shorten': {
        target: 'https://www.goprl.co.uk',
        changeOrigin: true,
        secure: true
      }
    }
  },
  resolve: {
    alias: {
      "$lib": path.resolve('src'),
      "@": path.resolve('src')
    }
  }
});
