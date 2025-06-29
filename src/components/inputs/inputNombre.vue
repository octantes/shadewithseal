<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue', 'input', 'change'])
const props = defineProps({
  modelValue: { type: String, default: ''},
  placeholder: { type: String, default: 'Write here'},
})

function onInput(evento) {
  emit('update:modelValue', evento.target.value)
}
</script>

<template>
  <input type="text" class="input" :value="modelValue" :placeholder="placeholder" @input="onInput" />
</template>

<style scoped>
.input {
  width: auto;
  height: 4.5rem;
  flex-grow: 1;
  color: #d8dade;
  background-color: #1b1c1c;
  font-size: 2.5rem;
  padding: 1rem;
}
.input:hover { background: #3c3c3c; }
</style>