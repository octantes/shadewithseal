<script setup>
import { CodeBracketIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['clickCodigo'])
</script>

<template>
  <button title="Code your shader" type="button" class="botonChico" @click="emit('clickCodigo')" >
    <CodeBracketIcon class="botonChicoIcono" />
  </button>
</template>