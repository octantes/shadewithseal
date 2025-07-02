<script setup>
import { PlayIcon, PauseIcon } from '@heroicons/vue/24/solid'
import { defineProps, defineEmits } from 'vue'
const props = defineProps({ activo: Boolean })
const emit = defineEmits(['clickReproducir'])
</script>

<template>
  <button title="Play/Pause shader execution" type="button" class="boton" @click="emit('clickReproducir')" >
    <component :is="activo ? PauseIcon : PlayIcon" class="botonIcono" />
  </button>
</template>