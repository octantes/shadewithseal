<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['clickReiniciar'])
</script>

<template>
  <button title="Reset shader" type="button" class="boton" @click="emit('clickReiniciar')" >
    <ArrowPathIcon class="botonIcono" />
  </button>
</template>