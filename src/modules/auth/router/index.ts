import RegisterView from '@/modules/auth/views/RegisterView.vue'
import LoginView from '@/modules/auth/views/LoginView.vue'

export default [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
]
