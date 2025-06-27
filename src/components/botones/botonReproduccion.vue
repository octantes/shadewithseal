<script setup>

import { PlayPauseIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'

const emit = defineEmits(['click'])

function manejarClick() {
  emit('click')
}

</script>

<template>
  <button @click="manejarClick">
    <PlayPauseIcon></PlayPauseIcon>
  </button>
</template>