<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconLeaderboard from './icons/IconLeaderboard.vue'
import IconTeam from './icons/IconTeam.vue'
import IconGame from './icons/IconGame.vue'
import IconLogout from './icons/IconLogout.vue'

const router = useRouter();


const teamName = ref('')
if (localStorage.getItem('user') !== null) {
  teamName.value = JSON.parse(localStorage.getItem('user')).team.name
}

function logout() {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<template>
  <div class="border b-r-white b-r-solid w-60">
    <div class="header ml-3">
      <h2>Métrolympiades</h2>
      <h3 v-if="teamName !== ''">{{ teamName }}</h3>
      <h3 v-else class="italic font-200">Utilisateur non connecté</h3>
    </div>
    <div class="menu_items flex flex-col gap-3 ml-2 mt-5">
      <router-link to="/leaderboard" class="menu_item no-underline flex items-center gap-2 hover:bg-gray-700 hover:text-blue-600 p-2 rounded">
        <IconLeaderboard />
        <span>Classement général</span>
      </router-link>
      <router-link to="/team" class="menu_item no-underline flex items-center gap-2 hover:bg-gray-700 hover:text-blue-600 p-2 rounded">
        <IconTeam />
        <span>Mon équipe</span>
      </router-link>
      <router-link to="/games" class="menu_item no-underline flex items-center gap-2 hover:bg-gray-700 hover:text-blue-600 p-2 rounded">
        <IconGame />
        <span>Mes matches</span>
      </router-link>
      <button @click="logout" class="menu_item no-underline flex items-center gap-2 font-size-4 bg-[#313338] border-none cursor-pointer hover:bg-gray-700 hover:text-blue-600 p-2 rounded">
        <IconLogout/>
        <span>Se déconnecter</span>
      </button>
    </div>
  </div>
</template>
