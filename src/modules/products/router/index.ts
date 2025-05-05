import { isAuthenticatedGuard } from '@/guards/authentication'

export default [
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductListView.vue'),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: isAuthenticatedGuard,
  },
]
