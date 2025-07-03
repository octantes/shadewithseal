export function crearGrabadorCanvas(canvas, opciones = { 
  mimeType: 'video/webm; codecs=vp9',
  videoBitsPerSecond: 20_000_000,
}) {
  let mediaRecorder = null
  let chunks = []
  let grabando = false

  function iniciar() {
    if (grabando) return
    chunks = []
    const stream = canvas.captureStream(60) // 60fps, ajustar según conveniencia
    mediaRecorder = new MediaRecorder(stream, opciones)
    mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data)
      }
    }
    mediaRecorder.start()
    grabando = true
  }

  function detener() {
    return new Promise(resolve => {
      if (!grabando) {
        resolve(null)
        return
      }
      mediaRecorder.onstop = () => {
        grabando = false
        const blob = new Blob(chunks, { type: opciones.mimeType })
        resolve(blob)
      }
      mediaRecorder.stop()
    })
  }
  return { iniciar, detener }
}