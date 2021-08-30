import vue from '@vitejs/plugin-vue'
import path from 'path'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/_variables.scss";`
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  }
}
