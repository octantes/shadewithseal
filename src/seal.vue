<script setup>
import { ref, onMounted } from 'vue'
import vistaCodigo from './components/vistas/vistaCodigo.vue'
import vistaGuardar from './components/vistas/vistaGuardar.vue'

const mostrarBiblioteca = ref(false)
const codigoActual = ref('')
const tipoActual = ref('')

</script>

<template>
  <div class="seal">
    <div class="columna">

      <vistaCodigo v-model="codigoActual"
        @clickGuardar="mostrarBiblioteca = true"
        @cambiarTipo="tipoActual = $event"
      />

      <vistaGuardar v-show="mostrarBiblioteca"
        @cerrar="mostrarBiblioteca = false"
        :codigo="codigoActual"
        :tipo="tipoActual" 
      />

    </div>
  </div>
</template>

<style>
.seal {
  height: 100vh;
  width: 100vw;
  background: #d8dade;
  padding: 1rem;
  gap:1rem;
  overflow: hidden;
}
</style>