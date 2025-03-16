import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {defineDora} from '@doki-land/dora'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(defineDora({
    locale: 'zh-CN'
}))

app.mount('#app')