<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const incorrectAuth = ref(false)

const isFormValid = computed(() => {
  return !!email.value.trim() && !!password.value.trim()
})

const isLoading = ref(false)

function login() {
  isLoading.value = true

  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Login successful')
        return response.json()
      } else {
        console.log('Login failed')
        incorrectAuth.value = true
        return Promise.reject('Login failed')
      }
    })
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data))
      router.push('/leaderboard')
    })
    .catch((error) => {
      console.error('Error:', error)
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <h2 class="text-center">Connexion</h2>
  <form @submit.prevent="login" class="flex flex-col gap-4">
    <input
      class="p-2 rounded"
      type="email"
      name="UserEmail"
      id="user_email"
      v-model="email"
      placeholder="Email"
    />
    <input
      class="p-2 rounded"
      type="password"
      name="UserPassword"
      id="user_password"
      v-model="password"
      placeholder="Mot de passe"
    />
    <p class="m-0 text-red text-center" v-if="incorrectAuth">Email ou mot de passe incorrect</p>
    <button
      class="p-2 border rounded-lg"
      :class="{ 'bg-blue': isFormValid, 'bg-gray-400 cursor-not-allowed': !isFormValid }"
      :disabled="!isFormValid || isLoading"
      type="submit"
    >
      Connexion
    </button>
  </form>
  <div class="flex gap-3 mt-2">
    <p class="m-0">Pas encore de compte ?</p>
    <router-link to="/register">Je m'inscris</router-link>
  </div>
</template>
