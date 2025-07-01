<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import bibliotecaEstructura from '../biblioteca/bibliotecaEstructura.vue';
import bibliotecaGuardar from '../biblioteca/bibliotecaGuardar.vue';
import inputCodigo from '../inputs/inputCodigo.vue'

import botonCodigo from '../botones/botonCodigo.vue'
import botonGuardar from '../botones/botonGuardar.vue';
import botonCarpeta from '../botones/botonCarpeta.vue'
import botonArchivo from '../botones/botonArchivo.vue'

import botonRetroceder from '../botones/botonRetroceder.vue'
import botonReproducir from '../botones/botonReproducir.vue'
import botonGrabar from '../botones/botonGrabar.vue'
import botonAvanzar from '../botones/botonAvanzar.vue'

const mostrarEstructura = ref(false)
const tipoActual = ref('')
const mostrarCodigo = ref(false)

const emit = defineEmits(['update:codigo'])
const props = defineProps({
  codigo: String,
})

function alternarBiblioteca() {
  mostrarEstructura.value = !mostrarEstructura.value
  if (mostrarEstructura.value) mostrarCodigo.value = false
}

function alternarCodigo() {
  mostrarCodigo.value = !mostrarCodigo.value
  if (mostrarCodigo.value) mostrarEstructura.value = false
}

</script>

<template>

  <div class="columna">

    <div class="fila">
      
      <botonCodigo @clickCodigo="alternarCodigo" />
      <botonGuardar @clickGuardar="alternarBiblioteca" />

      <div class="fila" v-if="mostrarEstructura" >

        <botonCarpeta @clickCarpeta="tipoActual = 'carpeta'" />
        <botonArchivo @clickArchivo="tipoActual = 'archivo'" />

      </div>

      <div class="fila" v-if="mostrarCodigo">
        
        <botonRetroceder @clickRetroceder="" />
        <botonReproducir @clickReproducir="" />
        <botonGrabar @clickGrabar="" />
        <botonAvanzar @clickAvanzar="" />

      </div>

    </div>

    <inputCodigo v-if="mostrarCodigo" :modelValue="props.codigo" @update:modelValue="emit('update:codigo', $event)" />

    <bibliotecaGuardar v-if="tipoActual" :tipoActual="tipoActual" :codigo="props.codigo" @cerrar="tipoActual=''" />
    <bibliotecaEstructura v-if="mostrarEstructura" />

  </div>

</template>