<script setup>

import { ref, onMounted } from 'vue'
import { obtenerCarpetas, obtenerArchivosPorCarpeta } from '../indexed.js'

const biblioteca = ref([])
const seleccionada = ref(null)

onMounted(async () => {
  const carpetas = await obtenerCarpetas()
  const resultado = []
  for (const carpeta of carpetas) {
    const archivos = await obtenerArchivosPorCarpeta(carpeta.nombre)
    resultado.push({
      nombre: carpeta.nombre,
      archivos: archivos.map(a => a.nombre),
      abierta: false,
    })
  }
  biblioteca.value = resultado
})

</script>

<template>

  <div class="biblioteca">

    <div class="columna" v-for="carpeta in biblioteca" :key="carpeta.nombre">

      <div class="cosa" @click="carpeta.abierta = !carpeta.abierta">
        <span>{{ carpeta.nombre }}</span>
      </div>

      <div v-if="carpeta.abierta">
        <div class="cosa" v-for="archivo in carpeta.archivos" :key="carpeta.nombre + '/' + archivo">
          <span class="etiqueta">{{ '- ' + archivo }}</span>
        </div>
      </div>
      
    </div>

  </div>

</template>

<style scoped>
.cosa { cursor: pointer; padding: .25em; }
.cosa:hover { background: #3c3c3c; }
</style>