<script setup>
import { ref } from 'vue'
import vistaBiblioteca from './components/vistas/vistaBiblioteca.vue'
import vistaShader from './components/vistas/vistaShader.vue'

const codigoActual = ref('')
const reproduciendo = ref(false)

function resetear() {
  reproduciendo.value = false
  const temp = codigoActual.value
  codigoActual.value = ''
  setTimeout(() => {
    codigoActual.value = temp
  }, 0)
}

</script>

<template>

  <div class="seal">

    <vistaShader :codigo="codigoActual" :reproduciendo="reproduciendo" />

    <vistaBiblioteca
      v-model:codigo="codigoActual"
      :reproduciendo="reproduciendo"
      @reproduccion="reproduciendo = $event"
      @resetear="resetear"
    />

  </div>

</template>