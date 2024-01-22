import { useAuth } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const { isAuth } = useAuth();

  if (to.path === '/blog-admin' && !isAuth) {
    return navigateTo('/admin');
  }
});
