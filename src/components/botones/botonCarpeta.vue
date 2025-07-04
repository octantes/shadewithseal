<script setup>
import { FolderPlusIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['clickCarpeta'])
</script>

<template>
  <button title="Create a new folder" type="button" class="boton" @click="emit('clickCarpeta')" >
    <FolderPlusIcon class="botonIcono" />
  </button>
</template>