<script setup>
import SideBar from '@/components/SideBar.vue';
import { ref } from 'vue';
import IconCross from '@/components/icons/IconCross.vue';

const token = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).token : null;
const team = ref({});
const teamName = ref('');
const user = JSON.parse(localStorage.getItem('user'));

const members = ref([]);

const userName = ref(user !== null ? user.username : '');
userName.value += ' (Vous)';

fetch("http://localhost:3000/teams/me", {
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
      console.log('Failed to fetch team');
      return Promise.reject('Failed to fetch team');
    }
  })
  .then((data) => {
    team.value = data;
    teamName.value = data.name;
    members.value = data.members;
  })
  .catch((error) => {
    console.error('Error:', error);
  });


  function addMember() {
    members.value.push('');
  }

  function deleteMember(index) {
    members.value.splice(index, 1);
  }

  function save() {
    const data = {
      name: teamName.value,
      members: members.value,
    };

    fetch("http://localhost:3000/teams/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Failed to update team');
          return Promise.reject('Failed to update team');
        }
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

</script>

<template>
  <div class="flex gap-2 h-screen">
    <SideBar/>
    <div class="container w-screen p-10">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h2>Mon équipe</h2>
          <button type="submit" @click="save" class="text-black rounded-lg h-10 no-underline flex items-center text-lg px-4 bg-cyan-500 hover:bg-cyan-600 cursor-pointer hover:font-bold">Enregistrer</button>
        </div>
      </div>
      <form @submit.prevent="" class="flex flex-col gap-4 w-40%">
        <label for="teamName" class="text-lg font-bold">Nom de l'équipe</label>
        <input type="text" name="teamName" id="teamName" v-model="teamName" class="border-2 border-gray-300 rounded-lg p-2  mb-4"/>
        <h3>Membres de l'équipe</h3>
        <input type="text" disabled v-model="userName" class="border-2 border-gray-300 rounded-lg p-2 w-88% mb-4 disabled:opacity-70 disabled:bg-white"/>
        <div class="flex gap-2 items-center mb-4" v-for="(member, index) in members" :key="index">
            <input type="text" v-model="members[index]" class="border-2 border-gray-300 rounded-lg p-2 w-full"/>
          <button @click="deleteMember(index)" class="bg-transparent b-none cursor-pointer"><IconCross/></button>
        </div>
        <button @click="addMember" class=" cursor-pointer text-black rounded-lg h-10 no-underline flex items-center justify-center w-50% text-center m-a text-lg px-4 bg-cyan-500 hover:bg-cyan-600 cursor-pointer hover:font-bold">Ajouter un coéquipier</button>
      </form>
    </div>
  </div>
</template>
