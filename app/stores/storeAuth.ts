import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const pb = usePocketBase()

  // State
  const isValid = ref(pb.authStore.isValid)
  const user = ref(pb.authStore.model)
  const uploader = ref<any>(null)

  // Actions
  function update() {
    isValid.value = pb.authStore.isValid
    user.value = pb.authStore.model
    if (isValid.value) {
      fetchUploader()
    }
    else {
      uploader.value = null
    }
  }

  async function login(email: string, password: string) {
    await pb.collection('users').authWithPassword(email, password)
    update()
  }

  async function register(email: string, password: string, passwordConfirm: string) {
    // Create the user account
    await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
    })
    // Automatically authenticate after registration
    await pb.collection('users').authWithPassword(email, password)
    update()
  }

  function logout() {
    pb.authStore.clear()
    update()
  }

  async function loginWithOAuth(providerType: string) {
    await pb.collection('users').authWithOAuth2({ provider: providerType })
    update()
    if (isValid.value) {
      await fetchUploader()
    }
  }

  async function fetchUploader() {
    try {
      const resultList = await pb.collection('uploaders').getList(1, 50, {
        filter: `user="${user.value?.id}"`,
      })
      if (resultList.items.length > 0) {
        uploader.value = resultList.items[0]
      }
    }
    catch (error) {
      console.error('Error fetching uploader details:', error)
    }
  }

  // Initialize the state
  update()

  return {
    isValid,
    user,
    uploader,
    update,
    login,
    register,
    loginWithOAuth,
    logout,
  }
})
