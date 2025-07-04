<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['clickCancelar'])
</script>

<template>
  <button title="Discard changes" type="button" class="boton" @click="emit('clickCancelar')" >
    <XMarkIcon class="botonIcono" />
  </button>
</template>