<script setup>

import { PlayIcon, PauseIcon } from '@heroicons/vue/24/solid'
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['clickReproduccion'])
const reproduciendo = ref(false);

function manejarClick() {
  reproduciendo.value = !reproduciendo.value
  emit('clickReproduccion')
}

</script>

<template>
  <button title="Play/Pause shader execution" type="button" class="botonCanvasVariable" @click="manejarClick" >
    <component :is="reproduciendo ? PauseIcon : PlayIcon" class="botonCanvasIcono" />
  </button>
</template>