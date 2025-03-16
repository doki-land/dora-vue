import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineDora } from '@doki-land/dora'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(defineDora({
  locale: 'zh-CN'
}))

app.mount('#app')