export function validarCampoObligatorio(valor) {
  return valor.trim() ? '' : 'Completa este campo.'
}

export function validarCorreo(correo) {
  if (!correo.trim()) {
    return 'Completa este campo.'
  }

  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)
    ? ''
    : 'Ingresa un correo electrónico válido.'
}

export function validarClave(clave) {
  return clave.length >= 6
    ? ''
    : 'La contraseña debe tener al menos 6 caracteres.'
}

export function validarConfirmacionClave(clave, confirmacion) {
  return clave === confirmacion ? '' : 'Las contraseñas no coinciden.'
}
