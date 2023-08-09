/// <reference types="vite/client" />

import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
// import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '#/': `${path.resolve(__dirname, '../dist')}/`,
      'string-to-file': path.resolve(__dirname, process.env.USEPACK === 'true' ? '../dist' : '../src'),
    },
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    Vue(),
  ],
});
