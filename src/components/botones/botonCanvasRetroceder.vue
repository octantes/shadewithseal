<script setup>

import { BackwardIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickRetroceder'])

function manejarClick() {
  emit('clickRetroceder')
}

</script>

<template>
  <button title="Previous shader on the list" type="button" class="botonCanvas" @click="manejarClick" >
    <BackwardIcon class="botonCanvasIcono" />
  </button>
</template>