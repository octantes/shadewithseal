<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Write your code here...' }
})

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <textarea class="input" :value="modelValue" :placeholder="placeholder" @input="onInput"></textarea>
</template>

<style scoped>
.input {
  width: 100%;
  min-height: 200px;
  font-family: monospace;
  font-size: 14px;
  background: #111;
  color: #d8dade;
  border: 1px solid #333;
  padding: 8px;
  resize: vertical;
}
</style>