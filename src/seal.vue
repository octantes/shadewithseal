<script setup>
import { ref } from 'vue'
import vistaBiblioteca from './components/vistas/vistaBiblioteca.vue'
import shaderCanvas from './components/shader/shaderCanvas.vue'

const codigoActual = ref('')

</script>

<template>

  <div class="seal">

    <shaderCanvas :codigo="codigoActual" />
    <vistaBiblioteca v-model:codigo="codigoActual" />

  </div>

</template>