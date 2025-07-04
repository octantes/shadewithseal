<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['clickAceptar'])
</script>

<template>
  <button title="Apply changes" type="button" class="boton" @click="emit('clickAceptar')" >
    <CheckIcon class="botonIcono" />
  </button>
</template>