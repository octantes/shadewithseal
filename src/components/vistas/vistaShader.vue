<script setup>
import { onMounted, onBeforeUnmount, watch, ref, defineExpose } from 'vue'
import { prepararPrograma, iniciarRenderLoop, detenerRenderLoop, resizeCanvas } from '../webgl.js'
import outputModal from '../inputs/outputModal.vue'

const placeholderShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(st.x, st.y, 0.5 + 0.5 * sin(u_time));
  gl_FragColor = vec4(color, 1.0);
}
`

const props = defineProps({
  codigo: { type: String, default: placeholderShader },
  reproduciendo: Boolean
})

const canvasRef = ref(null)
let gl, program

defineExpose({ canvasRef })

const errorShader = ref(null)

function render() {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  gl = canvas.getContext('webgl')
  if (!gl) {
    errorShader.value = 'webgl no soportado'
    return
  }
  resizeCanvas(canvas)
  const resultado = prepararPrograma(gl, props.codigo.trim() || placeholderShader)
  errorShader.value = resultado
}

onMounted(() => {
  render()
})

watch(() => props.codigo, () => {
  detenerRenderLoop()
  render()
  if (props.reproduciendo) iniciarRenderLoop()
})

watch(() => props.reproduciendo, activo => {
  if (activo) iniciarRenderLoop()
  else detenerRenderLoop()
})

onBeforeUnmount(() => {
  detenerRenderLoop()
})
</script>

<template>
  <div class="contenedorCanvas">
    <canvas ref="canvasRef" class="shaderCanvas"></canvas>
    <outputModal :mensaje="errorShader" />
  </div>
</template>

<style>
.contenedorCanvas {
  position: relative;
  width:100%;
}
.shaderCanvas {
  aspect-ratio: 1 / 1;
  display: block;
  width:100%;
}
</style>