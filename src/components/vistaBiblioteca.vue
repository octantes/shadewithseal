<script setup>
import { ref } from 'vue'
import botonesBibliotecaAcciones from './botones/botonesBibliotecaAcciones.vue'
import botonesBibliotecaCrear from './botones/botonesBibliotecaCrear.vue'
import inputBibliotecaNombre from './inputs/inputBibliotecaNombre.vue'

const tipo = ref('')
const mostrarInput = ref(false)
const nombreNuevo = ref('')

function manejarClickAceptar() {
  emit('clickAceptar')
}

function crearCarpeta() {
  tipo.value = 'carpeta'
  mostrarInput.value = true
}

function crearArchivo() {
  tipo.value = 'archivo'
  mostrarInput.value = true
}

async function confirmarCreacion() {
  if (tipo.value === 'carpeta') {
    await crearCarpeta(nombreNuevo.value)
  } else if (tipo.value === 'archivo') {
    await crearArchivo({ carpeta: 'default', nombre: nombreNuevo.value, codigo: '' })
  }
  nombreNuevo.value = ''
  mostrarInput.value = false
}
</script>

<template>
  <div class="fila">
    <botonesBibliotecaCrear @clickCarpeta="crearCarpeta" @clickArchivo="crearArchivo" />
    <inputBibliotecaNombre v-if='mostrarInput' v-model="nombreNuevo" placeholder="Write the name" />
    <botonesBibliotecaAcciones v-if='mostrarInput' @clickAceptar="manejarClickAceptar" @clickCancelar="" />
  </div>
</template>