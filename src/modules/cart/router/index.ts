import { isAuthenticatedGuard } from '@/guards/authentication'

export default [
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/modules/cart/views/CartView.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: isAuthenticatedGuard,
  },
]
