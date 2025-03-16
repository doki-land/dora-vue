import type { App } from 'vue'
import { DoraLayout } from './components/DoraLayout'

export interface DoraOptions {
  locale?: string
}

export default {
  install(app: App, options?: DoraOptions) {
    // 注册全局组件
    app.component('DoraLayout', DoraLayout)

    // 初始化国际化配置
    if (options?.locale) {
      app.config.globalProperties.$doraLocale = options.locale
    }
  }
}

export function defineDora(config?: DoraOptions) {
  return {
    ...config,
    install: (app: App) => app.use(DoraLayout, config)
  }
}