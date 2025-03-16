import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent } from 'vue'

const Home = defineComponent({
  template: '<div>Home Page</div>'
})

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router