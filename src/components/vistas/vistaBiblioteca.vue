<script setup>

import { ref, defineProps } from 'vue'
import bibliotecaEstructura from '../biblioteca/bibliotecaEstructura.vue';
import bibliotecaGuardar from '../biblioteca/bibliotecaGuardar.vue';
import botonGuardar from '../botones/botonGuardar.vue';
import botonCarpeta from '../botones/botonCarpeta.vue'
import botonArchivo from '../botones/botonArchivo.vue'

const mostrarEstructura = ref(false)
const tipoActual = ref('')

const props = defineProps({
  codigo: String,
})

</script>

<template>

  <div class="columna">

    <div class="fila">
      <botonGuardar @clickGuardar="mostrarEstructura = !mostrarEstructura" />
      <botonCarpeta @clickCarpeta="tipoActual = 'carpeta'" />
      <botonArchivo @clickArchivo="tipoActual = 'archivo'" />
    </div>

    <div class="columna" >
      <bibliotecaGuardar v-if="tipoActual" :tipoActual="tipoActual" :codigo="props.codigo" @cerrar="tipoActual=''" />
      <bibliotecaEstructura v-if="mostrarEstructura" />
    </div>

  </div>

</template>