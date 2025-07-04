<script setup>
import { ref, computed } from 'vue'

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
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  min-height: 0;
  overflow: hidden auto;
  font-family: monospace;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  line-height: 1.5;
  color: #d8dade;
  gap: .5rem;
}
.numeros {
  box-sizing: border-box;
  padding: 1rem 0 0 0;
  user-select: none;
  background: #2b2c2c;
  width: 2rem;
  color: #aaabac;
  scrollbar-width: none;
  -ms-overflow-style: none;
  text-align: center;
  overflow: hidden auto;
  scrollbar-gutter: stable;
}
.numeros span { display: block; height: 1.5em; line-height: 1.5em; width: 2rem; }
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
  border-radius: 5px;
  scrollbar-gutter: stable;

}
input::-webkit-scrollbar { display: none; }
</style>