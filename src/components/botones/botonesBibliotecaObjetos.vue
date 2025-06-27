<script setup>

import botonBibliotecaArchivo from './botonBibliotecaArchivo.vue'
import botonBibliotecaCarpeta from './botonBibliotecaCarpeta.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickArchivo', 'clickCarpeta'])

function manejarClickArchivo() {
  emit('clickArchivo')
}

function manejarClickCarpeta() {
  emit('clickCarpeta')
}

</script>

<template>
  <div class="fila">
    <botonBibliotecaArchivo @clickArchivo="manejarClickArchivo" />
    <botonBibliotecaCarpeta @clickCarpeta="manejarClickCarpeta" />
  </div>
</template>