<script setup>
import { BackwardIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'
const emit = defineEmits(['clickRetroceder'])
</script>

<template>
  <button title="Previous shader on the list" type="button" class="boton" @click="emit('clickRetroceder')" >
    <BackwardIcon class="botonIcono" />
  </button>
</template>