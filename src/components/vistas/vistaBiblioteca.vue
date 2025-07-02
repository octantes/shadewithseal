<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import bibliotecaEstructura from '../biblioteca/bibliotecaEstructura.vue'
import bibliotecaGuardar from '../biblioteca/bibliotecaGuardar.vue'
import inputCodigo from '../inputs/inputCodigo.vue'

import botonCodigo from '../botones/botonCodigo.vue'
import botonGuardar from '../botones/botonGuardar.vue'
import botonCarpeta from '../botones/botonCarpeta.vue'
import botonArchivo from '../botones/botonArchivo.vue'

import botonRetroceder from '../botones/botonRetroceder.vue'
import botonReproducir from '../botones/botonReproducir.vue'
import botonGrabar from '../botones/botonGrabar.vue'
import botonAvanzar from '../botones/botonAvanzar.vue'

const reproduciendo = ref(false)
const mostrarEstructura = ref(false)
const mostrarCodigo = ref(false)
const tipoActual = ref('')

const emit = defineEmits(['update:codigo', 'reproduccion'])
const props = defineProps({
  codigo: String,
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
  reproduciendo.value = !reproduciendo.value
  emit('reproduccion', reproduciendo.value)
}

</script>

<template>

  <div class="columna">

    <div class="columna">

      <div class="fila">

        <botonCodigo @clickCodigo="alternarCodigo" />

        <div class="fila" v-if="mostrarCodigo">
          <botonRetroceder @clickRetroceder="" />
          <botonReproducir :activo="reproduciendo" @clickReproducir="alternarReproduccion" />
          <botonGrabar @clickGrabar="" />
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
        <bibliotecaEstructura v-if="mostrarEstructura && !tipoActual" />
  
      </div>

    </div>

  </div>

</template>