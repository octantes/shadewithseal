<script setup>
import { DocumentPlusIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['clickArchivo'])
</script>

<template>
  <button title="Create a new shader" type="button" class="boton" @click="emit('clickArchivo')" >
    <DocumentPlusIcon class="botonIcono" />
  </button>
</template>