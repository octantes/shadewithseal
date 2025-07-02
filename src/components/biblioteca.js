import { ref } from 'vue'
import {
  obtenerCarpetas,
  obtenerArchivosPorCarpeta,
  eliminarCarpeta,
  eliminarArchivo,
  renombrarCarpeta,
  renombrarArchivo,
  crearArchivo,
  crearCarpeta
} from './indexed.js'

const biblioteca = ref([])
const cargando = ref(false)
const creando = ref(false)
const error = ref(null)

async function cargarBiblioteca() {
  cargando.value = true
  error.value = null
  try {
    const resultado = []

    const archivosDefault = await obtenerArchivosPorCarpeta('default')
    resultado.push({
      id: 'default',
      nombre: 'default',
      nuevoNombre: 'default',
      editando: false,
      abierta: false,
      archivos: archivosDefault.map(a => ({
        id: a.id,
        nombre: a.nombre,
        nuevoNombre: a.nombre,
        editando: false
      }))
    })

    const carpetas = await obtenerCarpetas()
    for (const carpeta of carpetas) {
      if (carpeta.nombre === 'default') continue
      const archivos = await obtenerArchivosPorCarpeta(carpeta.nombre)
      resultado.push({
        id: carpeta.id,
        nombre: carpeta.nombre,
        nuevoNombre: carpeta.nombre,
        editando: false,
        abierta: false,
        archivos: archivos.map(a => ({
          id: a.id,
          nombre: a.nombre,
          nuevoNombre: a.nombre,
          editando: false
        }))
      })
    }

    biblioteca.value = resultado
  } catch (e) {
    error.value = e
  } finally {
    cargando.value = false
  }
}

async function eliminarCarpetaDesdeUI(carpeta) {
  if (!carpeta?.nombre || carpeta.nombre === 'default') return
  try {
    // asegurar que se pase el nombre actual persistido, no el nombre editable
    await eliminarCarpeta(carpeta.nombre)
    const idx = biblioteca.value.findIndex(c => c.id === carpeta.id)
    if (idx !== -1) biblioteca.value.splice(idx, 1)
  } catch (e) {
    error.value = e
  }
}

async function eliminarArchivoDesdeUI(carpetaNombre, archivoNombre) {
  const carpeta = biblioteca.value.find(c => c.nombre === carpetaNombre)
  const archivo = carpeta?.archivos.find(a => a.nombre === archivoNombre)
  if (!archivo) return
  try {
    await eliminarArchivo(archivo.id)
    const idx = carpeta.archivos.findIndex(a => a.id === archivo.id)
    if (idx !== -1) carpeta.archivos.splice(idx, 1)
  } catch (e) {
    error.value = e
  }
}

function cancelarEdicion(obj) {
  obj.editando = false
  obj.nuevoNombre = obj.nombre
}

async function confirmarEdicion(obj, carpeta = null) {
  const limpio = obj.nuevoNombre.trim()
  if (!limpio || limpio === obj.nombre) {
    cancelarEdicion(obj)
    return
  }

  try {
    if (!carpeta) {
      if (biblioteca.value.some(c => c.nombre === limpio)) {
        throw new Error('That folder already exists')
      }
      await renombrarCarpeta(obj.nombre, limpio)
      const carpetaUI = biblioteca.value.find(c => c.id === obj.id)
      carpetaUI.nombre = limpio
      carpetaUI.nuevoNombre = limpio
      carpetaUI.editando = false
    } else {
      // buscar carpeta UI por id (no por nombre)
      const carpetaUI = biblioteca.value.find(c => c.id === carpeta.id)
      if (carpetaUI.archivos.some(a => a.nombre === limpio)) {
        throw new Error('That file already exists')
      }
      const idViejo = `${carpeta.nombre}/${obj.nombre}`
      await renombrarArchivo(idViejo, limpio)
      const archivoUI = carpetaUI.archivos.find(a => a.nombre === obj.nombre)
      archivoUI.nombre = limpio
      archivoUI.nuevoNombre = limpio
      archivoUI.id = `${carpeta.nombre}/${limpio}`
      archivoUI.editando = false
    }
  } catch (e) {
    error.value = e
  }
}

async function guardarNuevoArchivo({ carpeta, nombre, codigo }) {
  if (!nombre) return false
  creando.value = true
  try {
    const archivo = await crearArchivo({ carpeta, nombre, codigo })
    const carpetaUI = biblioteca.value.find(c => c.nombre === carpeta)
    if (carpetaUI) {
      carpetaUI.archivos.push({
        id: archivo.id,
        nombre: archivo.nombre,
        nuevoNombre: archivo.nombre,
        editando: false
      })
    } else {
      await cargarBiblioteca()
    }
    return true
  } catch (e) {
    error.value = e
    return false
  } finally {
    creando.value = false
  }
}

async function guardarNuevaCarpeta(nombre) {
  const limpio = nombre.trim()
  if (!limpio) throw new Error('You must enter a name')
  if (biblioteca.value.some(c => c.nombre === limpio)) {
    throw new Error('That folder already exists')
  }

  creando.value = true
  try {
    const carpeta = await crearCarpeta(limpio)
    biblioteca.value.push({
      id: carpeta.id,
      nombre: carpeta.nombre,
      nuevoNombre: carpeta.nombre,
      editando: false,
      abierta: false,
      archivos: []
    })
    return true
  } catch (e) {
    error.value = e
    throw e
  } finally {
    creando.value = false
  }
}


export function useBiblioteca() {
  return {
    biblioteca,
    cargando,
    creando,
    error,
    cargarBiblioteca,
    eliminarCarpetaDesdeUI,
    eliminarArchivoDesdeUI,
    cancelarEdicion,
    confirmarEdicion,
    guardarNuevoArchivo,
    guardarNuevaCarpeta
  }
}