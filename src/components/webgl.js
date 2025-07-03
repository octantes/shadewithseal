let gl, program, uniforms
let startTime = 0
let pausedTime = 0
let animFrame
let running = false
let frameCount = 0
let mouseX = 0, mouseY = 0, clickX = 0, clickY = 0

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
    const error = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    return error
  }
  return shader
}

export function prepararPrograma(glContext, fragSrc) {
  gl = glContext
  const vs = crearShader(gl, gl.VERTEX_SHADER, vertexShaderSrc)
  const fs = crearShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  if (typeof vs === 'string') return { type: 'VERTEX', message: vs }
  if (typeof fs === 'string') return { type: 'FRAGMENT', message: fs }
  program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program)
    return `error en linkeo:\n${error}`
  }
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
  uniforms = {
    uTime: gl.getUniformLocation(program, 'u_time'),
    uRes: gl.getUniformLocation(program, 'u_resolution'),
    iTime: gl.getUniformLocation(program, 'iTime'),
    iResolution: gl.getUniformLocation(program, 'iResolution'),
    iFrame: gl.getUniformLocation(program, 'iFrame'),
    iMouse: gl.getUniformLocation(program, 'iMouse'),
    iTimeDelta: gl.getUniformLocation(program, 'iTimeDelta'),
    iDate: gl.getUniformLocation(program, 'iDate'),
  }
  pausedTime = 0
  startTime = performance.now()
  return null
}

function renderLoop() {
  if (!gl || !program) return
  const now = performance.now()
  const t = (now - startTime) / 1000
  const dt = (now - (startTime + frameCount * (1000 / 60))) / 1000
  const date = new Date()
  const seconds = date.getSeconds() + 60 * date.getMinutes() + 3600 * date.getHours()
  gl.useProgram(program)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clear(gl.COLOR_BUFFER_BIT)
  if (uniforms.uTime) gl.uniform1f(uniforms.uTime, t)
  if (uniforms.iTime) gl.uniform1f(uniforms.iTime, t)
  if (uniforms.iTimeDelta) gl.uniform1f(uniforms.iTimeDelta, dt)
  if (uniforms.uRes) gl.uniform2f(uniforms.uRes, gl.canvas.width, gl.canvas.height)
  if (uniforms.iResolution) gl.uniform3f(uniforms.iResolution, gl.canvas.width, gl.canvas.height, 1.0)
  if (uniforms.iFrame) gl.uniform1i(uniforms.iFrame, frameCount++)
  if (uniforms.iMouse) gl.uniform4f(uniforms.iMouse, mouseX, mouseY, clickX, clickY)
  if (uniforms.iDate) gl.uniform4f(
    uniforms.iDate,
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    seconds
  )
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  animFrame = requestAnimationFrame(renderLoop)
}

let listenersAgregados = false

export function iniciarRenderLoop() {
  if (running) return
  running = true
  startTime = performance.now() - pausedTime
  frameCount = 0
  animFrame = requestAnimationFrame(renderLoop)
  if (!listenersAgregados && gl) {
    const canvas = gl.canvas
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = canvas.height - (e.clientY - rect.top)
    })
    canvas.addEventListener('mousedown', e => {
      const rect = canvas.getBoundingClientRect()
      clickX = e.clientX - rect.left
      clickY = canvas.height - (e.clientY - rect.top)
    })
    listenersAgregados = true
  }
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
