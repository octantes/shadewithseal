<script setup>

import { DocumentPlusIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickArchivo'])

function manejarClick() {
  emit('clickArchivo')
}

</script>

<template>
  <button title="Create a new shader" type="button" class="botonBiblioteca" @click="manejarClick" >
    <DocumentPlusIcon class="botonBibliotecaIcono" />
  </button>
</template>