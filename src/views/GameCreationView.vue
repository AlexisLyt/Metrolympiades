<script setup>
import SideBar from '@/components/SideBar.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const teams = ref([]);
const activities = ref([]);
const token = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).token : null;
const userTeam = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).team : null;

const opponent = ref('');
const selectedActivity = ref('');
const score1 = ref(0);
const score2 = ref(0);
const selectedDate = ref('');

fetch("http://localhost:3000/teams")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log('Failed to fetch teams');
      return Promise.reject('Failed to fetch teams');
    }
  })
  .then((data) => {
    teams.value = data;
    teams.value = teams.value.filter((team) => team.name !== userTeam);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

fetch("http://localhost:3000/activities")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log('Failed to fetch activities');
      return Promise.reject('Failed to fetch activities');
    }
  })
  .then((data) => {
    activities.value = data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const isFormValid = computed(() => {
  return (
    opponent.value !== '' &&
    selectedActivity.value !== '' &&
    selectedDate.value !== '' &&
    score1.value >= 0 &&
    score2.value >= 0
  );
});

function validateScore(scoreKey) {
  if (scoreKey === 'score1') {
    if (score1.value < 0) score1.value = 0;
    if (score1.value > 20) score1.value = 20;
  } else if (scoreKey === 'score2') {
    if (score2.value < 0) score2.value = 0;
    if (score2.value > 20) score2.value = 20;
  }
}

function getOpponentName(opponentId) {
  const team = teams.value.find((team) => team.id === opponentId);
  return team ? team.name : '';
}

function save() {
  console.log({
    opponent: opponent.value,
    activity: selectedActivity.value,
    score1: score1.value,
    score2: score2.value,
    startedAt: selectedDate.value,
  });
  fetch("http://localhost:3000/matches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      team2Id: opponent.value,
      activityId: selectedActivity.value,
      startedAt: selectedDate.value,
      team1Score: score1.value,
      team2Score: score2.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('Failed to create match');
        return Promise.reject('Failed to create match');
      }
    })
    .then((data) => {
      console.log('Match created successfully:', data);
      router.push('/games');
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}
</script>

<template>
  <div class="flex gap-2 h-screen">
    <SideBar />
    <div class="container w-screen p-10">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h2>Nouveau match</h2>
          <button
            type="submit"
            @click="save"
            :disabled="!isFormValid"
            class="text-black rounded-lg h-10 no-underline flex items-center text-lg px-4 bg-cyan-500 hover:bg-cyan-600 cursor-pointer hover:font-bold disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:font-normal disabled:text-gray-500"
          >
            Enregistrer
          </button>
        </div>
      </div>
      <form @submit.prevent="" class="flex flex-col gap-4 w-40%">
        <label for="opponent">Adversaire</label>
        <select
          v-model="opponent"
          name="opponent"
          id="opponent"
          class="rounded-lg h-10 no-underline flex items-center text-lg px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
        <label for="activity">Activité</label>
        <select
          name="activity"
          id="activity"
          v-model="selectedActivity"
          class="rounded-lg h-10 no-underline flex items-center text-lg px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">
            {{ activity.name }}
          </option>
        </select>
        <label for="date">Date et heure de début</label>
        <input
          type="datetime-local"
          v-model="selectedDate"
          id="date"
          name="date"
          class="rounded-lg h-10 no-underline flex items-center text-lg px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        />
        <p>Scores finaux</p>
        <div class="flex gap-4 flex-col">
          <div class="flex gap-4 items-center">
            <label for="team1">{{ userTeam.name }}</label>
            <input
              type="number"
              v-model="score1"
              min="0"
              max="20"
              id="team1"
              name="team1"
              @input="validateScore('score1')"
              class="rounded-lg h-10 w-8% no-underline flex items-center text-lg px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer"
            />
          </div>
          <div class="flex gap-4 items-center">
            <label for="team2">{{ getOpponentName(opponent) }}</label>
            <input
              type="number"
              v-model="score2"
              min="0"
              max="20"
              id="team2"
              name="team2"
              @input="validateScore('score2')"
              class="rounded-lg h-10 w-8% no-underline flex items-center text-lg px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
