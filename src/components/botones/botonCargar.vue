<script setup>
import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['clickGuardar'])
</script>

<template>
  <button title="Load a shader" type="button" class="boton" @click="emit('clickGuardar')" >
    <ArrowDownOnSquareIcon class="botonIcono" />
  </button>
</template>