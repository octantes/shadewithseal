<script setup>
import { FolderOpenIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['clickGuardar'])
</script>

<template>
  <button title="Save your shader" type="button" class="botonChico" @click="emit('clickGuardar')" >
    <FolderOpenIcon class="botonChicoIcono" />
  </button>
</template>