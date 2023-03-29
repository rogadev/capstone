import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to, _from) => {
  const { refreshUser } = useAuthStore();
  refreshUser();
  const { user } = useAuthStore();
  if (user === null) return navigateTo('/');
});