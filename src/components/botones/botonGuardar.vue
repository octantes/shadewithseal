<script setup>
import { FolderOpenIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'
const emit = defineEmits(['clickGuardar'])
</script>

<template>
  <button title="Save your shader" type="button" class="boton" @click="emit('clickGuardar')" >
    <FolderOpenIcon class="botonIcono" />
  </button>
</template>