<script setup>

import vistaCanvas from './components/vistaCanvas.vue'
import vistaBiblioteca from './components/vistaBiblioteca.vue'

</script>

<template>
  <div class="seal">
    <div class="columna">
      <vistaCanvas />
      <vistaBiblioteca />
    </div>
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