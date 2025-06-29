<script setup>
import { onMounted } from 'vue'
import { usarBiblioteca } from '../biblioteca.js'
import inputNombre from '../inputs/inputNombre.vue'
import inputSelector from '../inputs/inputSelector.vue'
import botonAceptar from '../botones/botonAceptar.vue'
import botonCancelar from '../botones/botonCancelar.vue'

const props = defineProps({
  codigo: String,
  tipo: String,
})
const emit = defineEmits(['cerrar'])

const {
  nombreNuevo,
  carpetaSeleccionada,
  carpetas,
  guardando,
  error,
  cargarCarpetas,
  guardarArchivo,
  cancelarGuardado,
} = usarBiblioteca(props.codigo)

onMounted(cargarCarpetas)

async function onAceptar() {
  const ok = await guardarArchivo()
  if (ok) emit('cerrar')
}

function onCancelar() {
  cancelarGuardado()
  emit('cerrar')
}
</script>

<template>
  <div class="fila">
    <inputNombre v-model="nombreNuevo" placeholder="Write the name of the shader" />
    <inputSelector
      v-if="props.tipo === 'archivo'"
      v-model="carpetaSeleccionada"
      :opciones="carpetas.map(c => c.nombre)"
      placeholder="Select folder"
    />
    <div v-if="error" class="error">{{ error }}</div>
    <botonAceptar
      :disabled="!nombreNuevo || guardando"
      @clickAceptar="onAceptar"
    />
    <botonCancelar
      :disabled="guardando"
      @clickCancelar="onCancelar"
    />
  </div>
</template>