<script setup>
import { ref } from 'vue';
import SideBar from '@/components/SideBar.vue';
import MatchItem from '@/components/MatchItem.vue';
const token = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).token : null;
console.log(token);

const matches = ref([]);

fetch("http://localhost:3000/matches/me", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log('Failed to fetch matches');
      return Promise.reject('Failed to fetch matches');
    }
  })
  .then((data) => {
    console.log(data);
    matches.value = data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });

</script>

<template>
  <div class="flex gap-2">
    <SideBar />
    <div class="container w-screen">
      <div class="p-10 flex flex-col gap-4 ">
        <div class="flex justify-between items-center">
          <h2>Mes matchs</h2>
          <RouterLink
            to="/game"
            class="text-black rounded-lg h-10 no-underline flex items-center text-lg px-4 bg-cyan-500 hover:bg-cyan-600 cursor-pointer hover:font-bold"
          >
            Ajouter un match
          </RouterLink>
        </div>
        <div>
          <MatchItem
            v-for="(match, index) in matches"
            :key="index"
            :match="match"
          />
        </div>
      </div>
    </div>
  </div>
</template>
