import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import('../views/Forum.vue')
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../views/Post.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router