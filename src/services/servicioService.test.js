import { beforeEach, describe, expect, it } from 'vitest'
import {
  actualizarServicio,
  crearServicio,
  eliminarServicio,
  listarServicios,
} from './servicioService'

const servicio = {
  codigo: 'SV-TEST',
  categoria: 'Consultas',
  nombre: 'Servicio de prueba',
  especie: 'Perro',
  duracion: '30 min',
  precio: 10000,
}

describe('servicioService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lista servicios iniciales y permite crear uno', () => {
    const iniciales = listarServicios()
    const creado = crearServicio(servicio)

    expect(iniciales.length).toBeGreaterThan(0)
    expect(creado).toMatchObject(servicio)
    expect(listarServicios()).toContainEqual(creado)
  })

  it('actualiza y elimina un servicio', () => {
    const creado = crearServicio(servicio)

    expect(actualizarServicio(creado.id, { precio: 15000 })).toMatchObject({
      ...servicio,
      id: creado.id,
      precio: 15000,
    })

    eliminarServicio(creado.id)
    expect(listarServicios()).not.toContainEqual(
      expect.objectContaining({ id: creado.id }),
    )
  })
})
