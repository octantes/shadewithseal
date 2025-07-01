<script setup>

import { ref, onMounted } from 'vue'
import { crearArchivo, crearCarpeta, obtenerCarpetas } from '../indexed.js'
import inputNombre from '../inputs/inputNombre.vue'
import inputSelector from '../inputs/inputSelector.vue'
import botonAceptar from '../botones/botonAceptar.vue'
import botonCancelar from '../botones/botonCancelar.vue'

const props = defineProps({ codigo: String, tipoActual: String })
const emit = defineEmits(['cerrar'])

const guardandoCarpeta = ref(false)
const guardandoArchivo = ref(false)
const carpetaSeleccionada = ref('default')
const nombreNuevo = ref('')
const carpetas = ref([])

async function cargarCarpetas() {
  try {
    carpetas.value = await obtenerCarpetas()
    if (!carpetas.value.find(c => c.nombre === carpetaSeleccionada.value)) {
      carpetaSeleccionada.value = carpetas.value.length
        ? carpetas.value[0].nombre
        : 'default'
    }
  } catch (e) {
    alert("no se pudieron cargar las carpetas")
  }
}

onMounted(cargarCarpetas)

async function guardarArchivo() {
  if (!nombreNuevo.value) return false
  guardandoArchivo.value = true
  try {
    await crearArchivo({
      carpeta: carpetaSeleccionada.value,
      nombre: nombreNuevo.value,
      codigo: props.codigo,
    })
    return true
  } catch {
    alert('falló el guardado')
    return false
  } finally {
    guardandoArchivo.value = false
  }
}

async function nuevaCarpeta() {
  if (!nombreNuevo.value) return false
  guardandoCarpeta.value = true
  try {
    await crearCarpeta(nombreNuevo.value)
    await cargarCarpetas()
    return true
  } catch {
    alert('falló la creación de carpeta')
    return false
  } finally {
    guardandoCarpeta.value = false
  }
}

async function onAceptar() {
  let ok = false
  if (props.tipoActual === 'archivo') {
    ok = await guardarArchivo()
  } else if (props.tipoActual === 'carpeta') {
    ok = await nuevaCarpeta()
  }
  if (ok) {
    nombreNuevo.value = ''
    emit('cerrar')
  }
}

function onCancelar() {
  nombreNuevo.value = ''
  emit('cerrar')
}

</script>

<template>

  <div class="fila" v-if="props.tipoActual">

    <inputNombre v-model="nombreNuevo" :placeholder="props.tipoActual === 'archivo' ? 'Name your shader' : 'Name your folder'"/>
    <inputSelector v-if="props.tipoActual === 'archivo'" v-model="carpetaSeleccionada"
      :opciones="carpetas.map(c => c.nombre)" placeholder="Select a folder" />
    <botonAceptar :disabled="!nombreNuevo || guardandoArchivo || guardandoCarpeta" @clickAceptar="onAceptar" />
    <botonCancelar :disabled="guardandoArchivo || guardandoCarpeta" @clickCancelar="onCancelar" />
    
  </div>

</template>