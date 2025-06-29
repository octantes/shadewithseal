<script setup>
import { ForwardIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'
const emit = defineEmits(['clickAvanzar'])
</script>

<template>
  <button title="Next shader on the list" type="button" class="botonGrande" @click="emit('clickAvanzar')" >
    <ForwardIcon class="botonGrandeIcono" />
  </button>
</template>