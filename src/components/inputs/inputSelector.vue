<script setup>
import { computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  modelValue: { type: String, default: '' },
  opciones: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Select' }
})
const emit = defineEmits(['update:modelValue'])
const valor = computed({
  get() {
    return props.modelValue
  },
  set(nuevo) {
    emit('update:modelValue', nuevo)
  }
})
</script>

<template>
  <div class="wrapper">
    <select class="input" v-model="valor">
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="opcion in opciones" :key="opcion" :value="opcion">{{ opcion }}</option>
    </select>
    <ChevronDownIcon class="arrow" />
  </div>
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
  border: none;
  appearance: none;
}
.wrapper {
  position: relative;
  display: inline-block;
}
.arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  color: #d8dade;
  pointer-events: none;
}
</style>