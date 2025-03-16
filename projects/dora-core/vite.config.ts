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
        watch: {
            include: ['src/**']
        },
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'DoraCore',
            fileName: (format) => `dora-core.${format}.js`,
            formats: ['es', 'umd']
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