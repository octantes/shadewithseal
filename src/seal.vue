<script setup>
import { ref } from 'vue'
import { crearGrabadorCanvas } from './components/recorder.js'
import vistaBiblioteca from './components/vistas/vistaBiblioteca.vue'
import vistaShader from './components/vistas/vistaShader.vue'

const codigoActual = ref('')
const reproduciendo = ref(false)
const grabando = ref(false)
const vistaShaderRef = ref(null)
let grabador = null

function resetear() {
  reproduciendo.value = false
  const temp = codigoActual.value
  codigoActual.value = ''
  setTimeout(() => {
    codigoActual.value = temp
  }, 0)
}

function toggleGrabacion() {
  if (!grabando.value) {
    if (!vistaShaderRef.value?.canvasRef) {
      console.error('no hay canvas para grabar')
      return
    }
    grabador = crearGrabadorCanvas(vistaShaderRef.value.canvasRef)
    grabador.iniciar()
    grabando.value = true
  }
  else {
    grabador.detener().then(blob => {
      grabando.value = false
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'shader_grabacion.webm'
      a.click()
      URL.revokeObjectURL(url)
      grabador = null
    })
  }
}

</script>

<template>

  <div class="seal">

    <vistaShader ref="vistaShaderRef"
      :codigo="codigoActual"
      :reproduciendo="reproduciendo"
    />

    <vistaBiblioteca v-model:codigo="codigoActual"
      :reproduciendo="reproduciendo"
      :grabando="grabando"
      @reproduccion="reproduciendo = $event"
      @resetear="resetear"
      @clickGrabar="toggleGrabacion"
    />

  </div>

</template>