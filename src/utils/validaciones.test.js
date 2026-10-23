import { describe, expect, it } from 'vitest'
import {
  validarCampoObligatorio,
  validarClave,
  validarConfirmacionClave,
  validarCorreo,
} from './validaciones'

describe('validaciones de formularios', () => {
  it('rechaza campos vacíos y acepta texto', () => {
    expect(validarCampoObligatorio('   ')).toBe('Completa este campo.')
    expect(validarCampoObligatorio('Ana')).toBe('')
  })

  it('valida el formato del correo', () => {
    expect(validarCorreo('')).toBe('Completa este campo.')
    expect(validarCorreo('correo-invalido')).toContain('válido')
    expect(validarCorreo('ana@correo.cl')).toBe('')
  })

  it('exige una clave de seis caracteres y confirma su coincidencia', () => {
    expect(validarClave('12345')).toContain('6 caracteres')
    expect(validarClave('123456')).toBe('')
    expect(validarConfirmacionClave('123456', '654321')).toContain('coinciden')
    expect(validarConfirmacionClave('123456', '123456')).toBe('')
  })
})
