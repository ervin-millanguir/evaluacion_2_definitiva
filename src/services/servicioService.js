
import { serviciosIniciales } from '../utils/adaptarCatalogo'

const CLAVE = 'servicios'

function leer() {
  const guardado = localStorage.getItem(CLAVE)

  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(serviciosIniciales))
    return [...serviciosIniciales]
  }

  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarServicios() {
  return leer()
}

export function obtenerServicio(id) {
  return (
    leer().find(
      (servicio) =>
        String(servicio.id) === String(id) ||
        servicio.codigo === String(id),
    ) ?? null
  )
}

export function crearServicio(datos) {
  const lista = leer()

  const nuevoId =
    Math.max(0, ...lista.map((servicio) => Number(servicio.id) || 0)) + 1

  const nuevo = {
    ...datos,
    id: nuevoId,
  }

  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarServicio(id, cambios) {
  const lista = leer().map((servicio) =>
    String(servicio.id) === String(id)
      ? { ...servicio, ...cambios }
      : servicio,
  )

  guardar(lista)

  return (
    lista.find((servicio) => String(servicio.id) === String(id)) ?? null
  )
}

export function eliminarServicio(id) {
  guardar(
    leer().filter(
      (servicio) => String(servicio.id) !== String(id),
    ),
  )
}
