import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'

import {URL, fileURLToPath} from 'node:url'

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: 'tsconfig.vue.json',
      entryRoot: 'src',
      copyDtsFiles: true,
    }),
    vue(),
    svgLoader({defaultImport: 'component'}),
  ],
  css: {
    postcss: {
      plugins: [postcssImport(), tailwindcss({config: './tailwind/tailwind.config.ts'}), autoprefixer()],
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: false,
    lib: {
      entry: 'src/main.ts',
      name: 'ui-kit',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router', '@tanstack/vue-query'],
      output: {
        preserveModules: true,
        entryFileNames: '[name].js',
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          '@tanstack/vue-query': 'VueQuery',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
