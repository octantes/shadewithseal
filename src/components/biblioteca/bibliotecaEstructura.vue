<script setup>
import { onMounted } from 'vue'
import { useBiblioteca } from '../biblioteca.js'

const {  biblioteca, cargarBiblioteca, eliminarCarpetaDesdeUI, eliminarArchivoDesdeUI, cancelarEdicion, confirmarEdicion } = useBiblioteca()
onMounted(cargarBiblioteca)

</script>

<template>

  <div class="biblioteca">

    <div class="columna" v-for="carpeta in biblioteca" :key="carpeta.nombre">

      <div class="objeto" @click="!carpeta.editando && (carpeta.abierta = !carpeta.abierta)">

        <template v-if="!carpeta.editando">
          <span>{{ carpeta.nombre }}</span>
          <div class="acciones">
            <button v-if="carpeta.nombre !== 'default'" @click.stop="carpeta.editando = true">✏️</button>
            <button v-if="carpeta.nombre !== 'default'" @click.stop="eliminarCarpetaDesdeUI(carpeta)">✖️</button>
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

        <div class="objeto" v-for="archivo in carpeta.archivos" :key="carpeta.nombre + '/' + archivo.nombre" >

          <template v-if="!archivo.editando">
            <span>{{ '¬ ' + archivo.nombre }}</span>
            <div class="acciones">
              <button @click.stop="archivo.editando = true">✏️</button>
              <button @click.stop="eliminarArchivoDesdeUI(carpeta.nombre, archivo.nombre)">✖️</button>
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
.biblioteca { display: flex; flex-direction: column; gap: 1em; padding: 1em; background: #1b1c1c; color: #d8dade; }
.objeto { display: flex; gap: 1rem; padding: .5em; cursor: pointer; }
.objeto:hover { background: #3c3c3c; }
.objeto input { background: #2b2c2c; color: #d8dade; padding: 0.5em; }
.acciones { display: none; gap: .5rem; font-size: 1rem; }
.objeto:hover .acciones { display: flex; }
</style>