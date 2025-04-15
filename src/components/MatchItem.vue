<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
});

const formatTime = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} - ${hours}h${minutes}`;
};

const activity = props.match.activity
const time = formatTime(props.match.startedAt)
const teamAlpha = props.match.team1
const teamBeta = props.match.team2
const scoreAlpha = props.match.team1Score
const scoreBeta = props.match.team2Score
</script>

<template>
  <div class="rounded-lg border b-solid b-white w-40% my-4 p-6 flex gap-3 flex-col text-lg">
      <div class="flex gap-15 text-sm">
        <p class="m-0 font-semibold">{{ activity }}</p>
        <p class="m-0 opacity-70">{{ time }}</p>
      </div>
      <div class="flex justify-between">
        <p class="m-0" :class="{ 'font-bold': scoreAlpha > scoreBeta }">{{ teamAlpha }}</p>
        <p class="m-0" :class="{ 'font-bold': scoreAlpha > scoreBeta }">{{ scoreAlpha }}</p>
      </div>
      <div class="flex justify-between">
        <p class="m-0" :class="{ 'font-bold': scoreAlpha < scoreBeta }">{{ teamBeta }}</p>
        <p class="m-0" :class="{ 'font-bold': scoreAlpha < scoreBeta }">{{ scoreBeta }}</p>
      </div>
  </div>
</template>
