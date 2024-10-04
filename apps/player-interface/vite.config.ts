import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3100,
    },
    base: './', // './' => relatives path
    build: {
        outDir: 'dist',
        rollupOptions: {},
    },
})
