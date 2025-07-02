<script setup>
import { ref, onMounted, watch } from 'vue'
import { useBiblioteca } from '../biblioteca.js'
import { obtenerCarpetas } from '../indexed.js'
import inputNombre from '../inputs/inputNombre.vue'
import inputSelector from '../inputs/inputSelector.vue'
import botonAceptar from '../botones/botonAceptar.vue'
import botonCancelar from '../botones/botonCancelar.vue'

const props = defineProps({
  codigo: String,
  tipoActual: String
})
const emit = defineEmits(['cerrar'])

const {
  biblioteca,
  cargarBiblioteca,
  guardarNuevoArchivo,
  guardarNuevaCarpeta,
  creando
} = useBiblioteca()

const nombreNuevo = ref('')
const carpetaSeleccionada = ref('')
const carpetas = ref([])

async function cargarCarpetas() {
  const todas = await obtenerCarpetas()
  if (!todas.find(c => c.nombre === 'default')) todas.unshift({ nombre: 'default' })
  carpetas.value = todas
  if (!carpetas.value.find(c => c.nombre === carpetaSeleccionada.value)) {
    carpetaSeleccionada.value = carpetas.value.length
      ? carpetas.value[0].nombre
      : 'default'
  }
}

async function onAceptar() {
  const limpio = nombreNuevo.value.trim()
  if (!limpio) {
    alert('debe ingresar un nombre')
    return
  }

  if (props.tipoActual === 'carpeta') {
    if (biblioteca.value.some(c => c.nombre === limpio)) {
      alert('ya existe esa carpeta')
      return
    }
  }

  if (props.tipoActual === 'archivo') {
    const carpeta = biblioteca.value.find(c => c.nombre === carpetaSeleccionada.value)
    if (carpeta?.archivos.some(a => a.nombre === limpio)) {
      alert('ya existe ese archivo en la carpeta seleccionada')
      return
    }
  }

  let ok = false
  try {
    if (props.tipoActual === 'archivo') {
      ok = await guardarNuevoArchivo({
        carpeta: carpetaSeleccionada.value,
        nombre: limpio,
        codigo: props.codigo
      })
    } else {
      ok = await guardarNuevaCarpeta(limpio) // esta ahora lanza error si falla
    }
  } catch (e) {
    alert(e.message || 'error al crear')
    return
  }

  if (!ok) {
    alert('no se pudo crear')
    return
  }

  await cargarCarpetas()
  await cargarBiblioteca()
  nombreNuevo.value = ''
  emit('cerrar')
}

function onCancelar() {
  nombreNuevo.value = ''
  emit('cerrar')
}

onMounted(cargarCarpetas)
watch(() => props.tipoActual, () => {
  nombreNuevo.value = ''
  carpetaSeleccionada.value = 'default'
  cargarCarpetas()
})
</script>

<template>
  <div class="fila" v-if="props.tipoActual">
    <inputNombre
      v-model="nombreNuevo"
      :placeholder="props.tipoActual === 'archivo'
        ? 'Name your shader'
        : 'Name your folder'"
    />

    <inputSelector
      v-if="props.tipoActual === 'archivo' && carpetas.length && carpetas.some(c => c.nombre === carpetaSeleccionada)"
      v-model="carpetaSeleccionada"
      :opciones="carpetas.map(c => c.nombre)"
      placeholder="Select a folder"
    />

    <botonAceptar
      :disabled="!nombreNuevo || creando"
      @click-aceptar="onAceptar"
    />
    <botonCancelar
      :disabled="creando"
      @click-cancelar="onCancelar"
    />
  </div>
</template>