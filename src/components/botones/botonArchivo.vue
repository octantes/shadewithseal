<script setup>
import { DocumentPlusIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'
const emit = defineEmits(['clickArchivo'])
</script>

<template>
  <button title="Create a new shader" type="button" class="botonChico" @click="emit('clickArchivo')" >
    <DocumentPlusIcon class="botonChicoIcono" />
  </button>
</template>