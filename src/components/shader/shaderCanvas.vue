<script setup>

import { onMounted, watch, ref } from 'vue'

const props = defineProps({
  codigo: {
    type: String,
    default: ''
  },
})

const canvasRef = ref(null)
let gl, program
let uTimeLoc, uResLoc
let startTime = performance.now()
let animFrame

const vertexShaderSrc = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

function crearShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function prepararPrograma(fragSrc) {
  const vs = crearShader(gl, gl.VERTEX_SHADER, vertexShaderSrc)
  const fs = crearShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  if (!vs || !fs) return null

  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog))
    return null
  }
  return prog
}

function renderLoop() {
  if (!gl || !program) return
  const t = (performance.now() - startTime) / 1000
  gl.useProgram(program)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clear(gl.COLOR_BUFFER_BIT)

  if (uTimeLoc) gl.uniform1f(uTimeLoc, t)
  if (uResLoc) gl.uniform2f(uResLoc, gl.canvas.width, gl.canvas.height)

  gl.drawArrays(gl.TRIANGLES, 0, 6)
  animFrame = requestAnimationFrame(renderLoop)
}

function render() {
  cancelAnimationFrame(animFrame)

  const canvas = canvasRef.value
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

  const userCode = props.codigo.trim()
  const tieneMain = /void\s+main\s*\(\s*\)/.test(userCode)

  const fragShader = `
#ifdef GL_ES
precision mediump float;
#endif

${userCode}

${tieneMain ? '' : `
void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`}
`

  program = prepararPrograma(fragShader)
  if (!program) return

  gl.useProgram(program)

  const posLoc = gl.getAttribLocation(program, 'position')
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  uTimeLoc = gl.getUniformLocation(program, 'u_time')
  uResLoc = gl.getUniformLocation(program, 'u_resolution')

  renderLoop()
}

onMounted(() => {
  const canvas = canvasRef.value
  gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('webgl no soportado')
    return
  }
  render()
})

watch(() => props.codigo, () => render())
</script>

<template>
  <canvas ref="canvasRef" class="shaderCanvas"></canvas>
</template>

<style>
.shaderCanvas {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: block;
}
</style>