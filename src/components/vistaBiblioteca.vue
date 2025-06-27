<script setup>
import { ref, onMounted } from 'vue'
import botonesBibliotecaAcciones from './botones/botonesBibliotecaAcciones.vue'
import botonesBibliotecaObjetos from './botones/botonesBibliotecaObjetos.vue'
import inputBibliotecaNombre from './inputs/inputBibliotecaNombre.vue'
import inputBibliotecaSelector from './inputs/inputBibliotecaSelector.vue'
import { crearCarpeta, crearArchivo, obtenerCarpetas } from '../indexed.js'

const tipo = ref('')
const mostrarInput = ref(false)
const nombreNuevo = ref('')
const carpetaSeleccionada = ref('default')
const carpetas = ref([])

function clickCarpeta() {
  tipo.value = 'carpeta'
  mostrarInput.value = true
  carpetaSeleccionada.value = 'default' // o vacío
}

function clickArchivo() {
  tipo.value = 'archivo'
  mostrarInput.value = true
  carpetaSeleccionada.value = 'default'
}

async function cargarCarpetas() {
  carpetas.value = await obtenerCarpetas()
  if (!carpetas.value.find(c => c.nombre === carpetaSeleccionada.value)) {
    carpetaSeleccionada.value = carpetas.value.length ? carpetas.value[0].nombre : 'default'
  }
}

onMounted(() => {
  cargarCarpetas()
})

async function confirmarCreacion() {
  if (!nombreNuevo.value) return
  if (tipo.value === 'carpeta') {
    await crearCarpeta(nombreNuevo.value)
    await cargarCarpetas() // recargar carpetas al crear una nueva
  } else if (tipo.value === 'archivo') {
    await crearArchivo({ carpeta: carpetaSeleccionada.value, nombre: nombreNuevo.value, codigo: '' })
  }
  limpiarEstado()
}

function limpiarEstado() {
  nombreNuevo.value = ''
  mostrarInput.value = false
  tipo.value = ''
  carpetaSeleccionada.value = 'default'
}
</script>

<template>
  <div class="fila">
    <botonesBibliotecaObjetos @clickCarpeta="clickCarpeta" @clickArchivo="clickArchivo" />
    <inputBibliotecaNombre v-if="mostrarInput" v-model="nombreNuevo" placeholder="Write the name" />
    <inputBibliotecaSelector
      v-if="mostrarInput && tipo === 'archivo'"
      v-model="carpetaSeleccionada"
      :opciones="carpetas.map(c => c.nombre)"
      placeholder="Select folder"
    />
    <botonesBibliotecaAcciones v-if="mostrarInput" @clickAceptar="confirmarCreacion" @clickCancelar="limpiarEstado" />
  </div>
</template>