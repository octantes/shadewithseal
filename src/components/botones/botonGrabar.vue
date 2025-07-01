<script setup>
import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/vue/24/solid'
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['clickGrabar'])
const grabando = ref(false);
function manejarClick() {
  grabando.value = !grabando.value
  emit('clickGrabar')
}
</script>

<template>
  <button title="Play/End shader recording" type="button" class="botonChico" @click="manejarClick" >
    <component :is="grabando ? PauseCircleIcon : PlayCircleIcon" class="botonChicoIcono" />
  </button>
</template>