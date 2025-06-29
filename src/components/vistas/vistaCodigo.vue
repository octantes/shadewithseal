<script setup>
import { ref, defineEmits, defineProps, onMounted } from 'vue'
import inputCodigo from '../inputs/inputCodigo.vue'
import botonGuardar from '../botones/botonGuardar.vue'
import botonCarpeta from '../botones/botonCarpeta.vue'
import botonArchivo from '../botones/botonArchivo.vue'

const emit = defineEmits(['update:modelValue', 'clickGuardar', 'cambiarTipo'])
const props = defineProps({ modelValue: String })

function actualizarCodigo(valor) {
  emit('update:modelValue', valor)
}

function seleccionarTipo(nuevoTipo) {
  emit('cambiarTipo', nuevoTipo)
}
</script>

<template>
  <div class="fila">
    <div class="columna">
      <botonGuardar @clickGuardar="emit('clickGuardar')" />
      <botonCarpeta @clickCarpeta="() => seleccionarTipo('carpeta')" />
      <botonArchivo @clickArchivo="() => seleccionarTipo('archivo')" />
    </div>
    <inputCodigo :modelValue="modelValue" @update:modelValue="actualizarCodigo" />
  </div>
</template>