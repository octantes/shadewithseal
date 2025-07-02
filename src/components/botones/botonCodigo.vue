<script setup>
import { CodeBracketIcon } from '@heroicons/vue/24/solid'
import { defineEmits } from 'vue'
const emit = defineEmits(['clickCodigo'])
</script>

<template>
  <button title="Code your shader" type="button" class="boton" @click="emit('clickCodigo')" >
    <CodeBracketIcon class="botonIcono" />
  </button>
</template>