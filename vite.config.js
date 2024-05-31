import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        nodeResolve({
          browser: true,
          preferBuiltins: true,
        }),
        commonjs(),
        inject({
          Buffer: ['buffer', 'Buffer'],
          process: 'process',
        }),
      ],
    },
  },
  optimizeDeps: {
    include: ['ethers'],
  },
  resolve: {
    alias: {
      process: 'process/browser',
      buffer: 'buffer',
    },
  },
  define: {
    'process.env': {},
  },
});
