<script setup>

import { ForwardIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickAvanzar'])

function manejarClick() {
  emit('clickAvanzar')
}

</script>

<template>
  <button title="Next shader on the list" type="button" class="botonCanvas" @click="manejarClick" >
    <ForwardIcon class="botonCanvasIcono" />
  </button>
</template>