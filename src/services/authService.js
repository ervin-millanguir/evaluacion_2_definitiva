const CLAVE_USUARIOS = 'usuarios'
const CLAVE_SESION = 'sesionActual'

function leerUsuarios() {
  return JSON.parse(localStorage.getItem(CLAVE_USUARIOS) || '[]')
}

export function registrarUsuario(usuario) {
  const usuarios = leerUsuarios()
  const correoNormalizado = usuario.correo.trim().toLowerCase()

  if (usuarios.some((actual) => actual.correo === correoNormalizado)) {
    return {
      ok: false,
      mensaje: 'Ya existe una cuenta con ese correo electrónico.',
    }
  }

  const nuevoUsuario = { ...usuario, correo: correoNormalizado }
  delete nuevoUsuario.confirmarContrasena
  usuarios.push(nuevoUsuario)
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))

  return { ok: true, usuario: nuevoUsuario }
}

export function iniciarSesion(correo, contrasena) {
  const correoNormalizado = correo.trim().toLowerCase()
  const usuario = leerUsuarios().find(
    (actual) =>
      actual.correo === correoNormalizado && actual.contrasena === contrasena,
  )

  if (!usuario) {
    return {
      ok: false,
      mensaje: 'El correo o la contraseña no son correctos.',
    }
  }

  const sesion = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
  }
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))

  return { ok: true, usuario: sesion }
}

export function obtenerSesion() {
  return JSON.parse(localStorage.getItem(CLAVE_SESION) || 'null')
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}
