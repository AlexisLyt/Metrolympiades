<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const teamName = ref('')
const email = ref('')
const password = ref('')

const isLoading = ref(false)

const isFormValid = computed(() => {
  return !!username.value.trim() && !!teamName.value.trim() && !!email.value.trim() && !!password.value.trim()
})

function register () {
  isLoading.value = true

  fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email.value,
      username: username.value,
      password: password.value,
      teamName: teamName.value
    })
  })
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('error during registration')
    }
  })
  .then((data) => {
    localStorage.setItem('user', JSON.stringify(data))
    router.push('/')
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
  <h2 class="text-center">Inscription</h2>
  <form @submit.prevent="register" class="flex flex-col gap-4">
    <input class="p-2 rounded" type="text" name="UserName" id="user_name" v-model="username" placeholder="Nom d'utilisateur">
    <input  class="p-2 rounded" type="text" name="TeamName" id="team_name" v-model="teamName" placeholder="Nom d'équipe">
    <input class="p-2 rounded" type="email" name="UserEmail" id="user_email" v-model="email" placeholder="Email" />
    <input class="p-2 rounded" type="password" name="UserPassword" id="user_password" v-model="password" placeholder="Mot de passe" />
    <button
      class="p-2 border rounded-lg"
      :class="{'bg-blue': isFormValid, 'bg-gray-400 cursor-not-allowed': !isFormValid}"
      :disabled="!isFormValid || isLoading"
      type="submit">
      J'inscris mon équipe
    </button>
    <div v-if="isLoading" class="flex justify-center items-center">
      <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    </div>
  </form>
  <div class="flex gap-3 mt-2">
    <p class="m-0">Déjà inscrit ?</p>
    <router-link to="/">Me connecter</router-link>
  </div>
</template>