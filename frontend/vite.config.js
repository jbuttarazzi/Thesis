// Imports Vite's config helper — gives you autocomplete and type checking on config options
import { defineConfig } from 'vite'

// Imports the official Vite plugin for React — enables JSX support, Fast Refresh (hot reloading), and Babel transforms
import react from '@vitejs/plugin-react'

// Defines and exports your Vite configuration
export default defineConfig({
  plugins: [react()], // Activates the React plugin — without this, JSX won't compile and Hot Module Replacement won't work
})