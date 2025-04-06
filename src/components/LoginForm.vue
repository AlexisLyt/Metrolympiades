<script setup>

</script>

<template>
  <h2 class="text-center">Connexion</h2>
  <form action="" class="flex flex-col gap-4">
    <input class="p-2 rounded" type="email" name="UserEmail" id="user_email" placeholder="Email" />
    <input class="p-2 rounded" type="password" name="UserPassword" id="user_password" placeholder="Mot de passe" />
    <button class="bg-blue p-2 border rounded-lg" type="submit">Connexion</button>
  </form>
  <div class="flex gap-3 mt-2">
    <p class="m-0">Pas encore de compte ?</p>
    <a href="">Je m'inscris</a>
  </div>
</template>
