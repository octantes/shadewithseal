<script setup>

import { FolderPlusIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickCarpeta'])

function manejarClick() {
  emit('clickCarpeta')
}

</script>

<template>
  <button title="Create a new folder" type="button" class="botonBiblioteca" @click="manejarClick" >
    <FolderPlusIcon class="botonBibliotecaIcono" />
  </button>
</template>