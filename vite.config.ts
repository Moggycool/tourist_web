import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    basicSsl() // Generates local SSL certificate automatically
  ],
  server: {
    https: true,
    port: 3000,
    host: '0.0.0.0'
  }
});