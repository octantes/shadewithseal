// src/composables/useBiblioteca.js
import { ref } from 'vue'
import { crearArchivo, obtenerCarpetas } from './indexed.js'

export function usarBiblioteca(codigoProp) {
  const nombreNuevo = ref('')
  const carpetaSeleccionada = ref('default')
  const carpetas = ref([])
  const guardando = ref(false)
  const error = ref(null)

  async function cargarCarpetas() {
    try {
      carpetas.value = await obtenerCarpetas()
      if (!carpetas.value.find(c => c.nombre === carpetaSeleccionada.value)) {
        carpetaSeleccionada.value = carpetas.value.length
          ? carpetas.value[0].nombre
          : 'default'
      }
    } catch (e) {
      error.value = 'no se pudieron cargar las carpetas'
    }
  }

  async function guardarArchivo() {
    if (!nombreNuevo.value) return
    guardando.value = true
    error.value = null
    try {
      await crearArchivo({
        carpeta: carpetaSeleccionada.value,
        nombre: nombreNuevo.value,
        codigo: codigoProp.value ?? codigoProp,
      })
      reiniciarFormulario()
      return true
    } catch (e) {
      error.value = 'falló el guardado'
      return false
    } finally {
      guardando.value = false
    }
  }

  function reiniciarFormulario() {
    nombreNuevo.value = ''
    carpetaSeleccionada.value = 'default'
  }

  function cancelarGuardado() {
    reiniciarFormulario()
  }

  return {
    nombreNuevo,
    carpetaSeleccionada,
    carpetas,
    guardando,
    error,
    cargarCarpetas,
    guardarArchivo,
    cancelarGuardado,
  }
}