import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 1. Must import Tailwind
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Must include Tailwind here!
    basicSsl()
  ],
  server: {
    https: true,
    port: 3000,
    host: '0.0.0.0'
  }
});