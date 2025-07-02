// webgl.js
let gl, program, uniforms
let startTime = 0
let pausedTime = 0
let animFrame
let running = false

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

export function prepararPrograma(glContext, fragSrc) {
  gl = glContext
  const vs = crearShader(gl, gl.VERTEX_SHADER, vertexShaderSrc)
  const fs = crearShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  if (!vs || !fs) return null

  program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    return null
  }
  gl.useProgram(program)

  const posLoc = gl.getAttribLocation(program, 'position')
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]),
    gl.STATIC_DRAW
  )
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  uniforms = {
    uTime: gl.getUniformLocation(program, 'u_time'),
    uRes: gl.getUniformLocation(program, 'u_resolution'),
  }
  pausedTime = 0
  startTime = performance.now()
  return program
}

function renderLoop() {
  if (!gl || !program) return
  const t = (performance.now() - startTime) / 1000
  gl.useProgram(program)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clear(gl.COLOR_BUFFER_BIT)

  if (uniforms.uTime) gl.uniform1f(uniforms.uTime, t)
  if (uniforms.uRes) gl.uniform2f(uniforms.uRes, gl.canvas.width, gl.canvas.height)

  gl.drawArrays(gl.TRIANGLES, 0, 6)
  animFrame = requestAnimationFrame(renderLoop)
}

export function iniciarRenderLoop() {
  if (running) return
  running = true
  startTime = performance.now() - pausedTime
  animFrame = requestAnimationFrame(renderLoop)
}

export function detenerRenderLoop() {
  if (!running) return
  running = false
  cancelAnimationFrame(animFrame)
  pausedTime = performance.now() - startTime
}

export function resizeCanvas(canvas) {
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
}