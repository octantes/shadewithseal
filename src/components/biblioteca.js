import { openDB } from 'idb'

const dbPromise = openDB('sealDB', 2, {
  upgrade(db, oldVersion) {
    if (!db.objectStoreNames.contains('carpetas')) {
      const carpetas = db.createObjectStore('carpetas', { keyPath: 'id' })
      carpetas.createIndex('porNombre', 'nombre', { unique: true })
    } else {
      const tx = db.transaction('carpetas', 'versionchange')
      const store = tx.objectStore('carpetas')
      if (!store.indexNames.contains('porNombre')) {
        store.createIndex('porNombre', 'nombre', { unique: true })
      }
    }

    if (!db.objectStoreNames.contains('archivos')) {
      const archivos = db.createObjectStore('archivos', { keyPath: 'id' })
      archivos.createIndex('porCarpeta', 'carpeta')
    } else {
      const tx = db.transaction('archivos', 'versionchange')
      const store = tx.objectStore('archivos')
      if (!store.indexNames.contains('porCarpeta')) {
        store.createIndex('porCarpeta', 'carpeta')
      }
    }
  }
})

// helpers
function generarId() {
  return crypto.randomUUID()
}

// carpetas
export async function crearCarpeta(nombre) {
  const db = await dbPromise
  const existe = await db.getFromIndex('carpetas', 'porNombre', nombre)
  if (existe) throw new Error('A folder with that name already exists')

  const nueva = { id: generarId(), nombre, creada: Date.now() }
  await db.add('carpetas', nueva)
  return nueva
}

export async function obtenerCarpetas() {
  const db = await dbPromise
  return db.getAll('carpetas')
}

export async function eliminarCarpeta(nombre) {
  const db = await dbPromise
  const carpeta = await db.getFromIndex('carpetas', 'porNombre', nombre)
  if (!carpeta) throw new Error('Folder not found')

  const archivos = await obtenerArchivosPorCarpeta(nombre)
  const tx = db.transaction(['carpetas', 'archivos'], 'readwrite')
  const carpetasStore = tx.objectStore('carpetas')
  const archivosStore = tx.objectStore('archivos')

  for (const archivo of archivos) {
    archivosStore.delete(archivo.id)
  }

  carpetasStore.delete(carpeta.id)
  await tx.done
}


// archivos
export async function crearArchivo({ carpeta, nombre, codigo }) {
  const db = await dbPromise
  const id = `${carpeta}/${nombre}`
  const existe = await db.get('archivos', id)
  if (existe) throw new Error('That file already exists in the selected folder')

  const archivo = {
    id,
    nombre,
    carpeta,
    codigo,
    creado: Date.now()
  }

  await db.add('archivos', archivo)
  return archivo
}

export async function obtenerArchivosPorCarpeta(carpeta) {
  const db = await dbPromise
  const tx = db.transaction('archivos')
  const index = tx.store.index('porCarpeta')
  return index.getAll(carpeta)
}

export async function eliminarArchivo(id) {
  const db = await dbPromise
  return db.delete('archivos', id)
}

export async function renombrarCarpeta(nombreViejo, nombreNuevo) {
  const db = await dbPromise;
  // busco la carpeta original por índice
  const carpeta = await db.getFromIndex('carpetas', 'porNombre', nombreViejo);
  if (!carpeta) throw new Error('Folder not found');
  // chequeo que no exista ya la nueva
  const existe = await db.getFromIndex('carpetas', 'porNombre', nombreNuevo);
  if (existe) throw new Error('A folder with that name already exists');

  // traigo todos los archivos de la carpeta vieja
  const archivos = await obtenerArchivosPorCarpeta(nombreViejo);
  // inicio tx en ambos object stores
  const tx = db.transaction(['carpetas', 'archivos'], 'readwrite');
  const carpetasStore = tx.objectStore('carpetas');
  const archivosStore  = tx.objectStore('archivos');

  // borro la carpeta vieja y agrego la nueva con el nombre actualizado
  carpetasStore.delete(carpeta.id);
  carpetasStore.add({ 
    ...carpeta, 
    nombre: nombreNuevo, 
    creada: Date.now() 
  });

  // para cada archivo, cambio su id (que es carpeta/nombre) y carpeta
  for (const archivo of archivos) {
    const nuevoId = `${nombreNuevo}/${archivo.nombre}`;
    archivosStore.delete(archivo.id);
    archivosStore.add({
      ...archivo,
      id: nuevoId,
      carpeta: nombreNuevo
    });
  }

  await tx.done;
}

export async function renombrarArchivo(idViejo, nombreNuevo) {
  const db = await dbPromise
  const archivo = await db.get('archivos', idViejo)
  if (!archivo) throw new Error('Folder not found')

  const nuevoId = `${archivo.carpeta}/${nombreNuevo}`
  const yaExiste = await db.get('archivos', nuevoId)
  if (yaExiste) throw new Error('A folder with that name already exists')

  await db.delete('archivos', idViejo)
  return db.add('archivos', { ...archivo, nombre: nombreNuevo, id: nuevoId })
}