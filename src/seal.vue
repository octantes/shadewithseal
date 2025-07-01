<script setup>
import { ref } from 'vue'
import vistaBiblioteca from './components/vistas/vistaBiblioteca.vue'
import shaderCanvas from './components/vistas/shaderCanvas.vue'
import inputCodigo from './components/inputs/inputCodigo.vue'

const codigoActual = ref('')

</script>

<template>

  <div class="seal">

      <shaderCanvas :codigo="codigoActual" />
      <inputCodigo v-model="codigoActual" />
      <vistaBiblioteca :codigo="codigoActual" />

  </div>

</template>