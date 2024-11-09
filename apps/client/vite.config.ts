import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base:
      mode === 'production'
        ? 'https://ask-it-static.kr.object.ncloudstorage.com/dist'
        : '/',
    plugins: [TanStackRouterVite(), react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
