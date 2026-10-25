import { beforeEach, describe, expect, it } from 'vitest'
import {
  actualizarEstadoCita,
  crearCita,
  listarCitas,
  obtenerUltimaCita,
} from './citaService'

describe('citaService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('crea una cita identificable y la guarda como última solicitud', () => {
    const cita = crearCita({
      servicio: 'Consulta general',
      nombreMascota: 'Luna',
      estado: 'Pendiente',
    })

    expect(cita.id).toMatch(/^CITA-/)
    expect(listarCitas()).toContainEqual(cita)
    expect(obtenerUltimaCita()).toEqual(cita)
  })

  it('actualiza el estado de una cita y de la última solicitud', () => {
    const cita = crearCita({ nombreMascota: 'Luna', estado: 'Pendiente' })

    expect(actualizarEstadoCita(cita.id, 'Confirmada')).toMatchObject({
      id: cita.id,
      estado: 'Confirmada',
    })
    expect(obtenerUltimaCita().estado).toBe('Confirmada')
  })
})
