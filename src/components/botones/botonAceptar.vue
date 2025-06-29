<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'
const emit = defineEmits(['clickAceptar'])
</script>

<template>
  <button title="Apply changes" type="button" class="botonChico" @click="emit('clickAceptar')" >
    <CheckIcon class="botonChicoIcono" />
  </button>
</template>