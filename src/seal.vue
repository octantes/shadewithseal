<script setup>

import botones from './components/botones.vue'

</script>

<template>
  <div class="seal">
    <botones @clickRetroceder="" @clickReproduccion="" @clickAvanzar="" />
  </div>
</template>

<style>
.seal
{
  height: 100vh;
  width: 100vw;
  background: #d8dade;
  padding: 1rem;
  gap:1rem;
}
</style>