const CLAVE_CITAS = 'misCitas'
const CLAVE_ULTIMA = 'ultimaCita'

function leerCitas() {
  const guardado = localStorage.getItem(CLAVE_CITAS)
  return guardado ? JSON.parse(guardado) : []
}

function guardarCitas(citas) {
  localStorage.setItem(CLAVE_CITAS, JSON.stringify(citas))
}

export function listarCitas() {
  return leerCitas()
}

export function crearCita(datos) {
  const cita = {
    ...datos,
    id: datos.id ?? `CITA-${Date.now()}`,
  }
  const citas = [...leerCitas(), cita]

  guardarCitas(citas)
  localStorage.setItem(CLAVE_ULTIMA, JSON.stringify(cita))
  return cita
}

export function actualizarEstadoCita(id, estado) {
  const citas = leerCitas().map((cita) =>
    cita.id === id ? { ...cita, estado } : cita,
  )
  const actualizada = citas.find((cita) => cita.id === id) ?? null

  guardarCitas(citas)

  const ultima = JSON.parse(localStorage.getItem(CLAVE_ULTIMA) || 'null')
  if (ultima?.id === id) {
    localStorage.setItem(CLAVE_ULTIMA, JSON.stringify(actualizada))
  }

  return actualizada
}

export function obtenerUltimaCita() {
  return JSON.parse(localStorage.getItem(CLAVE_ULTIMA) || 'null')
}
