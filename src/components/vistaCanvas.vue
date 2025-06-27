<script setup>
import botonesCanvas from './botones/botonesCanvas.vue'

function manejarClickRetroceder() {

}

function manejarClickReproduccion() {

}

function manejarClickAvanzar() {
  
}

</script>

<template>
  <botonesCanvas
    @clickRetroceder="manejarClickRetroceder"
    @clickReproduccion="manejarClickReproduccion"
    @clickAvanzar="manejarClickAvanzar"
  />
</template>