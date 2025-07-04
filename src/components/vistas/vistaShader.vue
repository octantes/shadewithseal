<script setup>
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import { prepararPrograma, iniciarRenderLoop, detenerRenderLoop, resizeCanvas } from '../webgl.js'
import outputModal from '../inputs/outputModal.vue'

const placeholderShader = `
// Author: @patriciogv
// Title: Simple Voronoi

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(.0);

    // Scale
    st *= 5.;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 10.;  // minimum distance
    vec2 m_point;        // minimum point

    for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            vec2 neighbor = vec2(float(i),float(j));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5*sin(u_time + 6.2831*point);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);

            if( dist < m_dist ) {
                m_dist = dist;
                m_point = point;
            }
        }
    }

    // Assign a color using the closest point position
    color += dot(m_point,vec2(.3,.6));

    gl_FragColor = vec4(color,1.0);
}
`

const props = defineProps({
  codigo: { type: String, default: placeholderShader },
  reproduciendo: Boolean,
})

const errorShader = ref(null)
const canvasRef = ref(null)
let gl, program
defineExpose({ canvasRef })

function render() {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  gl = canvas.getContext('webgl')
  if (!gl) {
    errorShader.value = 'webgl is not supported by your browser'
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