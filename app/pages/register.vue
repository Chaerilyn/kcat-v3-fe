<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

async function authenticate() {
  try {
    await authStore.loginWithOAuth('discord')
    router.push('/')
  }
  catch (error) {
    console.error('Authentication failed:', error)
    toast.add({
      severity: 'error',
      summary: 'Authentication Failed',
      detail: 'Failed to authenticate with Discord.',
      life: 5000,
    })
  }
}

async function registerWithData() {
  // Validation
  if (!email.value || !password.value || !passwordConfirm.value) {
    toast.add({
      severity: 'warn',
      summary: 'Validation Error',
      detail: 'Please fill in all fields.',
      life: 5000,
    })
    return
  }

  if (password.value.length < 6) {
    toast.add({
      severity: 'warn',
      summary: 'Validation Error',
      detail: 'Password must be at least 6 characters long.',
      life: 5000,
    })
    return
  }

  if (password.value !== passwordConfirm.value) {
    toast.add({
      severity: 'warn',
      summary: 'Validation Error',
      detail: 'Passwords do not match.',
      life: 5000,
    })
    return
  }

  try {
    await authStore.register(email.value, password.value, passwordConfirm.value)
    toast.add({
      severity: 'success',
      summary: 'Registration Successful',
      detail: 'Your account has been created successfully!',
      life: 3000,
    })
    router.push('/')
  }
  catch (error: any) {
    console.error('Registration failed:', error)
    const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create account. Please try again.'
    toast.add({
      severity: 'error',
      summary: 'Registration Failed',
      detail: errorMessage,
      life: 5000,
    })
  }
}
</script>

<template>
  <div class="min-h-screen">
    <section class="border-red-500 pt-[150px] flex items-center justify-center">
      <div class="bg-[#0f172a] p-5 flex rounded-2xl shadow-lg max-w-3xl">
        <div class="md:w-1/2 px-5">
          <h2 class="text-2xl text-white font-bold">
            Register
          </h2>
          <p class="text-sm text-white mt-2">
            Create a new account to get started
          </p>
          <form class="mt-6" action="#" method="POST" @submit.prevent="registerWithData">
            <div>
              <label class="block">Email Address</label>
              <InputText v-model="email" type="email" name="email" placeholder="Enter Email Address" class="w-full px-4 rounded-lg mt-2 border" autofocus required />
            </div>

            <div class="mt-4">
              <label class="block">Password</label>
              <InputText
                v-model="password" type="password" name="password" placeholder="Enter Password" minlength="6" class="w-full px-4 rounded-lg mt-2 border" required
              />
            </div>

            <div class="mt-4">
              <label class="block">Confirm Password</label>
              <InputText
                v-model="passwordConfirm" type="password" name="passwordConfirm" placeholder="Confirm Password" minlength="6" class="w-full px-4 rounded-lg mt-2 border" required
              />
            </div>

            <Button
              label="Register"
              icon="pi pi-user-plus"
              class="w-full mt-4 px-6 font-semibold rounded-lg transition-all duration-300 ease-in-out"
              @click="registerWithData()"
            />
          </form>

          <div class="text-sm text-white flex justify-between items-center mt-4">
            <p>Already have an account or using Discord?</p>
            <Button
              label="Login"
              severity="contrast"
              class="px-6 font-semibold rounded-lg transition-all duration-300 ease-in-out"
              @click="router.push('/login')"
            />
          </div>
        </div>

        <div class="w-1/2 md:block hidden ">
          <img src="https://i.imgur.com/EXCYeCW.jpeg" class="rounded-2xl" alt="page img">
        </div>
      </div>
    </section>
  </div>
</template>
