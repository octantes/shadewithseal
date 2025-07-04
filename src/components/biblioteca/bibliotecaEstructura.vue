<script setup>
import { onMounted } from 'vue'
import { useBiblioteca } from '../biblioteca.js'
import { obtenerArchivoPorId } from '../indexed.js'

const { biblioteca, cargarBiblioteca, eliminarCarpeta, eliminarArchivo, cancelarEdicion, confirmarEdicion } = useBiblioteca()
const emit = defineEmits(['cargarShader'])
onMounted(cargarBiblioteca)

function eliminarCarpetaConfirmada(carpeta) {
  const ok = confirm('Are you sure you want to delete this folder and all its files?')
  if (ok) eliminarCarpeta(carpeta)
}

function eliminarArchivoConfirmado(carpetaNombre, archivoNombre) {
  const ok = confirm('Are you sure you want to delete this file?')
  if (ok) eliminarArchivo(carpetaNombre, archivoNombre)
}

async function cargarArchivoConfirmado(carpetaNombre, archivoNombre) {
  const ok = confirm('Are you sure you want to load this shader? Unsaved changes will be lost.')
  if (!ok) return
  const id = `${carpetaNombre}/${archivoNombre}`
  const archivo = await obtenerArchivoPorId(id)
  if (archivo && archivo.codigo) emit('cargarShader', archivo.codigo)
}

</script>

<template>

  <div class="biblioteca">

    <div class="columna" v-for="carpeta in biblioteca" :key="carpeta.nombre">

      <div class="objeto" @click="!carpeta.editando && (carpeta.abierta = !carpeta.abierta)">

        <template v-if="!carpeta.editando">
          <span>{{ carpeta.nombre }}</span>
          <div class="acciones">
            <button v-if="carpeta.nombre !== 'default'" @click.stop="carpeta.editando = true">✏️</button>
            <button v-if="carpeta.nombre !== 'default'" @click.stop="eliminarCarpetaConfirmada(carpeta)">✖️</button>
          </div>
        </template>

        <template v-else>
          <input v-model="carpeta.nuevoNombre" @keyup.enter.stop="confirmarEdicion(carpeta)" autofocus />
          <div class="acciones">
            <button @click.stop="confirmarEdicion(carpeta)">✅</button>
            <button @click.stop="cancelarEdicion(carpeta)">❌</button>
          </div>
        </template>

      </div>

      <div v-if="carpeta.abierta && carpeta.archivos.length">

        <div class="objeto" v-for="archivo in carpeta.archivos" :key="carpeta.nombre + '/' + archivo.nombre" 
          @click="!archivo.editando && cargarArchivoConfirmado(carpeta.nombre, archivo.nombre)">

          <template v-if="!archivo.editando">
            <span>{{ '¬ ' + archivo.nombre }}</span>
            <div class="acciones">
              <button @click.stop="archivo.editando = true">✏️</button>
              <button @click.stop="eliminarArchivoConfirmado(carpeta.nombre, archivo.nombre)">✖️</button>
            </div>
          </template>

          <template v-else>
            <input v-model="archivo.nuevoNombre" @keyup.enter.stop="confirmarEdicion(archivo, carpeta)" autofocus />
            <div class="acciones">
              <button @click.stop="confirmarEdicion(archivo, carpeta)">✅</button>
              <button @click.stop="cancelarEdicion(archivo)">❌</button>
            </div>
          </template>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped>
.biblioteca { display: flex; flex-direction: column; gap: 1em; padding: 1em; background: #1b1c1c; color: #d8dade; border-radius: 5px; }
.objeto { display: flex; gap: 1rem; padding: .5em; cursor: pointer; }
.objeto:hover { background: #3c3c3c; }
.objeto input { background: #2b2c2c; color: #d8dade; padding: 0.5em; }
.acciones { display: none; gap: .5rem; font-size: 1rem; }
.objeto:hover .acciones { display: flex; }
</style>