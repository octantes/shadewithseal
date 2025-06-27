<script setup>

import botonCanvasRetroceder from './botonCanvasRetroceder.vue'
import botonCanvasReproduccion from './botonCanvasReproduccion.vue'
import botonCanvasAvanzar from './botonCanvasAvanzar.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickRetroceder', 'clickReproduccion' ,'clickAvanzar'])

function manejarClickRetroceder() {
  emit('clickRetroceder')
}

function manejarClickReproduccion() {
  emit('clickReproduccion')
}

function manejarClickAvanzar() {
  emit('clickAvanzar')
}

</script>

<template>
  <div class="fila">
    <botonCanvasRetroceder @clickRetroceder="manejarClickRetroceder"/>
    <botonCanvasReproduccion @clickReproduccion="manejarClickReproduccion"/>
    <botonCanvasAvanzar @clickAvanzar="manejarClickAvanzar"/>
  </div>
</template>