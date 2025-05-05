import { createRouter, createWebHistory } from 'vue-router'
import AuthRouter from '@/modules/auth/router/index.ts'
import ProductRouter from '@/modules/products/router/index.ts'
import CartRouter from '@/modules/cart/router/index.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...AuthRouter,

    ...ProductRouter,

    ...CartRouter,
  ],
})

export default router
