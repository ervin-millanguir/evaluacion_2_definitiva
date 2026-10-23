import { beforeEach, describe, expect, it } from 'vitest'
import {
  cerrarSesion,
  iniciarSesion,
  obtenerSesion,
  registrarUsuario,
} from './authService'

const usuario = {
  nombre: 'Ana',
  apellido: 'Pérez',
  correo: 'ANA@correo.cl',
  contrasena: 'segura123',
}

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('registra un usuario y normaliza su correo', () => {
    const resultado = registrarUsuario(usuario)

    expect(resultado.ok).toBe(true)
    expect(resultado.usuario.correo).toBe('ana@correo.cl')
  })

  it('rechaza un correo registrado previamente', () => {
    registrarUsuario(usuario)

    const resultado = registrarUsuario({ ...usuario, nombre: 'Otra persona' })

    expect(resultado.ok).toBe(false)
    expect(resultado.mensaje).toContain('Ya existe')
  })

  it('inicia sesión y guarda solo los datos públicos del usuario', () => {
    registrarUsuario(usuario)

    const resultado = iniciarSesion('ana@correo.cl', 'segura123')

    expect(resultado.ok).toBe(true)
    expect(obtenerSesion()).toEqual({
      nombre: 'Ana',
      apellido: 'Pérez',
      correo: 'ana@correo.cl',
    })
    expect(obtenerSesion()).not.toHaveProperty('contrasena')
  })

  it('rechaza credenciales inválidas y permite cerrar sesión', () => {
    registrarUsuario(usuario)

    expect(iniciarSesion('ana@correo.cl', 'incorrecta').ok).toBe(false)
    iniciarSesion('ana@correo.cl', 'segura123')
    cerrarSesion()

    expect(obtenerSesion()).toBeNull()
  })
})
