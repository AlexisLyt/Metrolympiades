<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'

const props = defineProps(["team", "index", "score"])


const teamName = ref(props.team)
const teamScore = ref(props.score)
const teamRank = ref(props.index + 1)

</script>

<template>
  <div class="rounded-lg border b-white b-solid flex gap-2 px-5 m-2 w-200% justify-between">
    <p>{{ teamRank }}</p>
    <p>{{ teamName }}</p>
    <p>{{ teamScore }}pts</p>
  </div>
</template>