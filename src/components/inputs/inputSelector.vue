<script setup>
import { computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: String, default: '' },
  opciones: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Select' }
})

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
.wrapper { position: relative; display: inline-block; }
.input {
  width: 100%;
  min-height: 2rem;
  color: #d8dade;
  background-color: #1b1c1c;
  font-size: 1rem;
  padding: 0.25rem 2rem 0.25rem 0.5rem;
  border: none;
  appearance: none;
}
.arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #d8dade;
  pointer-events: none;
}
</style>