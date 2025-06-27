<script setup>

import { XMarkIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickCancelar'])

function manejarClick() {
  emit('clickCancelar')
}

</script>

<template>
  <button title="Discard changes" type="button" class="botonBiblioteca" @click="manejarClick" >
    <XMarkIcon class="botonBibliotecaIcono" />
  </button>
</template>