<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import bibliotecaEstructura from '../biblioteca/bibliotecaEstructura.vue'
import bibliotecaGuardar from '../biblioteca/bibliotecaGuardar.vue'
import inputCodigo from '../inputs/inputCodigo.vue'

import botonCodigo from '../botones/botonCodigo.vue'
import botonGuardar from '../botones/botonGuardar.vue'
import botonCarpeta from '../botones/botonCarpeta.vue'
import botonArchivo from '../botones/botonArchivo.vue'

import botonReiniciar from '../botones/botonReiniciar.vue'
import botonReproducir from '../botones/botonReproducir.vue'
import botonGrabar from '../botones/botonGrabar.vue'
import botonAvanzar from '../botones/botonAvanzar.vue'

const mostrarEstructura = ref(false)
const mostrarCodigo = ref(false)
const tipoActual = ref('')

const emit = defineEmits(['update:codigo', 'reproduccion', 'resetear', 'clickGrabar'])
const props = defineProps({
  codigo: String,
  reproduciendo: Boolean,
  grabando: Boolean,
})

function alternarBiblioteca() {
  const estabaActiva = mostrarEstructura.value
  mostrarEstructura.value = !estabaActiva
  if (!mostrarEstructura.value) {
    tipoActual.value = ''
  } else {
    mostrarCodigo.value = false
  }
}

function alternarCodigo() {
  mostrarCodigo.value = !mostrarCodigo.value
  if (mostrarCodigo.value) {
    mostrarEstructura.value = false
    tipoActual.value = ''
  }
}

function alternarReproduccion() {
  emit('reproduccion', !props.reproduciendo)
}

function reemplazarCodigo(nuevoCodigo) {
  emit('update:codigo', nuevoCodigo)
}

</script>

<template>

  <div class="columna">

    <div class="columna">

      <div class="fila">

        <botonCodigo @clickCodigo="alternarCodigo" />

        <div class="fila" v-if="mostrarCodigo">
          <botonReiniciar @clickReiniciar="emit('resetear')" />
          <botonReproducir :activo="props.reproduciendo" @clickReproducir="alternarReproduccion" />
          <botonGrabar :grabando="props.grabando" @clickGrabar="$emit('clickGrabar')" />
          <botonAvanzar @clickAvanzar="" />
        </div>

      </div>

      <div class="fila">

        <botonGuardar @clickGuardar="alternarBiblioteca" />

        <div class="fila" v-if="mostrarEstructura && !tipoActual">
          <botonCarpeta @clickCarpeta="tipoActual = 'carpeta'" />
          <botonArchivo @clickArchivo="tipoActual = 'archivo'" />
        </div>

      </div>

      <div class="columna">
  
        <inputCodigo v-if="mostrarCodigo" :modelValue="props.codigo" @update:modelValue="emit('update:codigo', $event)" />
        <bibliotecaGuardar v-if="tipoActual" :tipoActual="tipoActual" :codigo="props.codigo" @cerrar="tipoActual = ''" />
        <bibliotecaEstructura v-if="mostrarEstructura && !tipoActual" @cargarShader="reemplazarCodigo"/>
  
      </div>

    </div>

  </div>

</template>