<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'
const emit = defineEmits(['clickCancelar'])
</script>

<template>
  <button title="Discard changes" type="button" class="botonChico" @click="emit('clickCancelar')" >
    <XMarkIcon class="botonChicoIcono" />
  </button>
</template>