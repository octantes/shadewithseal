<script setup>
import { defineEmits, ref, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Write your code here...' }
})

const numerosRef = ref(null)
const lines = computed(() => props.modelValue.split('\n').map((_, i) => i + 1))

function onInput(e) {
  emit('update:modelValue', e.target.value)
}

function syncScroll(e) {
  if (numerosRef.value) {
    numerosRef.value.scrollTop = e.target.scrollTop
  }
}
</script>

<template>
  <div class="wrapper">

    <div class="numeros" ref="numerosRef" aria-hidden="true">
      <span v-for="line in lines" :key="line">{{ line }}</span>
    </div>

    <textarea class="input" spellcheck="false" 
      :value="modelValue" 
      :placeholder="placeholder" 
      @input="onInput"
      @scroll="syncScroll"
    >
    
    </textarea>

  </div>
</template>

<style scoped>
.wrapper {
  flex-grow: 1;
  min-height: 0;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  font-family: monospace;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  line-height: 1.5;
  color: #d8dade;
}
.numeros {
  box-sizing: border-box;
  user-select: none;
  padding: 1rem;
  background: #2b2c2c;
  color: #aaabac;
  overflow: hidden auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.numeros span { display: block; height: 1.5em; }
.numeros::-webkit-scrollbar { display: none; }
.input {
  box-sizing: border-box;
  overflow-y: auto;
  resize: none;
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  background: #1b1c1c;
  color: #d8dade;
  scrollbar-width: none;
}
input::-webkit-scrollbar { display: none; }
</style>