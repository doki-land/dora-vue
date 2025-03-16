import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'DoraCore',
            fileName: (format) => `dora-core.${format}.js`
        },
        rollupOptions: {
            external: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'fluent-vue', '@fluent/bundle'],
            output: {
                globals: {
                    vue: 'Vue',
                    'vue-router': 'VueRouter',
                    pinia: 'Pinia',
                    '@vueuse/core': 'VueUse',
                    'fluent-vue': 'FluentVue',
                    '@fluent/bundle': 'FluentBundle'
                }
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/styles/_variables.scss";'
            }
        }
    }
})