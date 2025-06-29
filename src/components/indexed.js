import { openDB } from 'idb'

const dbPromise = openDB('sealDB', 1, {
  upgrade(db) {
    if(!db.objectStoreNames.contains('carpetas')) {
      db.createObjectStore('carpetas', { keyPath: 'nombre' })
    }
    if(!db.objectStoreNames.contains('archivos')) {
      db.createObjectStore('archivos', { keyPath: 'id' }).createIndex('porCarpeta', 'carpeta')
    }
  }
})

export async function crearCarpeta(nombre) {
  const db = await dbPromise
  return db.put('carpetas', { nombre, creada: Date.now() })
}

export async function crearArchivo( { carpeta, nombre, codigo } ) {
  const db = await dbPromise
  const id = `${carpeta}/${nombre}`
  return db.put('archivos', {
    id,
    nombre,
    carpeta,
    codigo,
    creado: Date.now()
  })
}

export async function obtenerArchivosPorCarpeta(carpeta) {
  const db = await dbPromise
  const tx = db.transaction('archivos')
  const index = tx.store.index('porCarpeta')
  return index.getAll(carpeta)
}

export async function obtenerCarpetas() {
  const db = await dbPromise
  return db.getAll('carpetas')
}