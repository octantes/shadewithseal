<script setup>
import { ref } from 'vue'
import vistaBiblioteca from './components/vistas/vistaBiblioteca.vue'
import vistaShader from './components/vistas/vistaShader.vue'

const codigoActual = ref('')
const reproduciendo = ref(false)

</script>

<template>

  <div class="seal">

    <vistaShader :codigo="codigoActual" :reproduciendo="reproduciendo" />
    <vistaBiblioteca v-model:codigo="codigoActual" @reproduccion="reproduciendo = $event" />

  </div>

</template>