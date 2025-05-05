import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import TokenService from "@/shared/services/token_service";

export const isAuthenticatedGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const tokenService = new TokenService();

  const token = tokenService.getAuthToken()

  if (token) {
    next()
  } else {
    next({ name: 'login' })
  }
}
