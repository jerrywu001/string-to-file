/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    Vue(),
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
});
