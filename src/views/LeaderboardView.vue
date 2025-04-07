<script setup>
import { ref } from 'vue';
import SideBar from '@/components/SideBar.vue';
import TeamItem from '@/components/TeamItem.vue';
import { onMounted } from 'vue';

const teams = ref([])
onMounted(() => {
  fetch("http://localhost:3000/ranking")
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.log('Failed to fetch teams')
        return Promise.reject('Failed to fetch teams')
      }
    })
    .then((data) => {
      teams.value = data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
})

</script>

<template>
  <div class="flex gap-2">
    <SideBar/>
    <div class="p-10">
      <h2>Classement général</h2>
      <div class="p-5">
        <TeamItem
          v-for="(team, index) in teams"
          :key="index"
          :team="team.team"
          :index="index"
          :score="team.points"
          />
      </div>
    </div>
  </div>
</template>