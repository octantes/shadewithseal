<script setup>
const props = defineProps({
  mensaje: { type: String, default: '' }
})
</script>

<template>
  <div class="modalError" v-if="mensaje">
    <pre>{{ mensaje }}</pre>
  </div>
</template>

<style scoped>
.modalError {
  position: absolute;
  background: #1b1c1c50;
  padding: 1rem;
  bottom: .5rem;
  left: .5rem;
  right: .5rem;
  color: #f88;
  font-size: 1rem;
  white-space: pre-wrap;
  overflow: auto;
  border-radius: 5px;
}
.modalError:hover { background: #1b1c1c; transition: 1s; }
</style>