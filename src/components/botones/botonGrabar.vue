<script setup>
import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/vue/24/solid'
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['clickGrabar'])
const props = defineProps({ grabando: Boolean })
function manejarClick() {
  emit('clickGrabar')
}
</script>

<template>
  <button title="Play/End shader recording" type="button" class="boton" @click="manejarClick" >
    <component :is="props.grabando ? PauseCircleIcon : PlayCircleIcon" class="botonIcono" />
  </button>
</template>