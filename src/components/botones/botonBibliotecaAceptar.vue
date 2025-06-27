<script setup>

import { CheckIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickAceptar'])

function manejarClick() {
  emit('clickAceptar')
}

</script>

<template>
  <button title="Apply changes" type="button" class="botonBiblioteca" @click="manejarClick" >
    <CheckIcon class="botonBibliotecaIcono" />
  </button>
</template>