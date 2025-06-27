<script setup>

import { defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue', 'input', 'change'])

const props = defineProps({
  modelValue: { type: String, default: ''},
  placeholder: { type: String, default: 'Write here'},
  disabled: Boolean,
})

function onInput(evento) {
  const val = evento.target.value
  emit('update:modelValue', val)
  emit('input', val)
}

function onChange(evento) {
  const val = evento.target.value
  emit('change', val)
}
</script>

<template>
  <input class="input" name="inputNombre" type="text"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onInput"
    @change="onChange"
  />
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