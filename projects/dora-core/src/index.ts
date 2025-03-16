import {App, Plugin} from 'vue'
import Layout from './components/Layout.vue'
import TopBar from './components/TopBar.vue'
import Category from './components/Category.vue'
import CategorySide from './components/CategorySide.vue'
import Section from './components/Section.vue'
import router from './router'
import fluentVue from './i18n'
import {DoraOptions} from './types/components'

// 导出组件
export const DoraLayout = Layout
export const DoraTopBar = TopBar
export const DoraCategory = Category
export const DoraCategorySide = CategorySide
export const DoraSection = Section

// 创建Dora实例的函数
export function createDora(options: DoraOptions = {}) {
    const plugin: Plugin = {
        install(app: App) {
            // 注册国际化
            app.use(fluentVue, {
                locale: options.locale || 'zh-Hans'
            })

            // 注册路由
            app.use(router)

            // 注册全局组件
            app.component('DoraLayout', Layout)
            app.component('DoraTopBar', TopBar)
            app.component('DoraCategory', Category)
            app.component('DoraCategorySide', CategorySide)
            app.component('DoraSection', Section)

            // 应用主题
            if (options.theme) {
                document.documentElement.setAttribute('data-theme', options.theme)
            }
        }
    }

    return plugin
}

// 为了兼容性，保留defineDora函数
export function defineDora(options: DoraOptions = {}) {
    return createDora(options)
}