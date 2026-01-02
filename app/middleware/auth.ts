export default defineNuxtRouteMiddleware((to) => {
  const pb = usePocketBase()

  if (!pb.authStore.isValid) {
    return navigateTo('/login')
  }
})
