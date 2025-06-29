<script setup>
import { PlayIcon, PauseIcon } from '@heroicons/vue/24/solid'
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['clickReproducir'])
const reproduciendo = ref(false);
function manejarClick() {
  reproduciendo.value = !reproduciendo.value
  emit('clickReproducir')
}
</script>

<template>
  <button title="Play/Pause shader execution" type="button" class="botonGrandeVariable" @click="manejarClick" >
    <component :is="reproduciendo ? PauseIcon : PlayIcon" class="botonGrandeIcono" />
  </button>
</template>