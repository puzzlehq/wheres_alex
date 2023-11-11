import { defineConfig } from 'vite';
import path from 'path';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import liveReload from 'vite-plugin-live-reload';
import wasm from 'vite-plugin-wasm';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import polyfills from 'rollup-plugin-polyfill-node';
import inject from '@rollup/plugin-inject';

const root = resolve(__dirname, './src');
const assetsDir = resolve(root, './assets');

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': assetsDir,
    },
  },
  plugins: [react(), liveReload('.path'), wasm()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      plugins: [polyfills(), inject({ Buffer: ['buffer', 'Buffer'] })],
      onLog(warning) {
        if (warning?.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
      },
    },
  },
});
