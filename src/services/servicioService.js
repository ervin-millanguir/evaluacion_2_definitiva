import { serviciosIniciales } from '../utils/adaptarCatalogo'

const CLAVE = 'serviciosAdmin'

function leer() {
  const guardado = localStorage.getItem(CLAVE)

  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(serviciosIniciales))
    return [...serviciosIniciales]
  }

  return JSON.parse(guardado)
}

function guardar(servicios) {
  localStorage.setItem(CLAVE, JSON.stringify(servicios))
}

export function listarServicios() {
  return leer()
}

export function crearServicio(datos) {
  const servicios = leer()
  const nuevo = {
    ...datos,
    id: datos.id ?? Date.now(),
  }

  guardar([...servicios, nuevo])
  return nuevo
}

export function actualizarServicio(id, cambios) {
  const servicios = leer().map((servicio) =>
    servicio.id === id ? { ...servicio, ...cambios } : servicio,
  )
  guardar(servicios)
  return servicios.find((servicio) => servicio.id === id) ?? null
}

export function eliminarServicio(id) {
  const servicios = leer().filter((servicio) => servicio.id !== id)
  guardar(servicios)
}
