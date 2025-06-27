<script setup>

import botonBibliotecaCancelar from './botonBibliotecaCancelar.vue'
import botonBibliotecaAceptar from './botonBibliotecaAceptar.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickAceptar', 'clickCancelar'])

function manejarClickAceptar() {
  emit('clickAceptar')
}

function manejarClickCancelar() {
  emit('clickCancelar')
}

</script>

<template>
  <div class="fila">
    <botonBibliotecaAceptar @clickAceptar="manejarClickAceptar" />
    <botonBibliotecaCancelar @clickCancelar="manejarClickCancelar" />
  </div>
</template>