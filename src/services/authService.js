import api from './api'
const USUARIO = 'sesionActual'
const TOKEN = 'happyPawsToken'

function limpiarAlmacenamiento() {
  localStorage.removeItem(USUARIO)
  localStorage.removeItem(TOKEN)
}
function jwtVencido(token) {
  try {
    const parte = token.split('.')[1]
    const datos = JSON.parse(atob(parte.replace(/-/g, '+').replace(/_/g, '/')))
    return !datos.exp || datos.exp * 1000 <= Date.now()
  } catch { return true }
}
export function obtenerSesion() {
  const token = localStorage.getItem(TOKEN)
  const raw = localStorage.getItem(USUARIO)
  if (!token || !raw || jwtVencido(token)) { limpiarAlmacenamiento(); return null }
  try {
    const usuario = JSON.parse(raw)
    return usuario?.id && usuario?.rol ? usuario : null
  } catch { limpiarAlmacenamiento(); return null }
}
export function cerrarSesion() { limpiarAlmacenamiento() }
export async function registrarUsuario(datos) {
  try {
    const respuesta = await api.post('/auth/registro', {
      nombre: datos.nombre, apellido:datos.apellido,
      correo: datos.correo.trim().toLowerCase(), contrasena: datos.contrasena
    })
    return { ok:true, usuario:respuesta.data.usuario, mensaje:respuesta.data.mensaje }
  } catch (error) { return {ok:false,mensaje:error.response?.data?.mensaje || 'Error de conexión con el backend'} }
}
export async function iniciarSesion(correo, contrasena) {
  try {
    const respuesta = await api.post('/auth/login', { correo:correo.trim().toLowerCase(), contrasena })
    const { token, usuario } = respuesta.data
    if (!token || !usuario?.rol) throw new Error('Respuesta sin JWT o usuario')
    localStorage.setItem(TOKEN, token)
    localStorage.setItem(USUARIO, JSON.stringify(usuario))
    return {ok:true,usuario}
  } catch (error) { return {ok:false,mensaje:error.response?.data?.mensaje || 'No se pudo iniciar sesión'} }
}
export async function validarSesionRemota() {
  const respuesta = await api.get('/auth/me')
  localStorage.setItem(USUARIO, JSON.stringify(respuesta.data.usuario))
  return respuesta.data.usuario
}
export async function listarUsuarios() { return (await api.get('/usuarios')).data }
export async function crearUsuarioAdmin(datos) { return (await api.post('/usuarios',datos)).data }
export async function modificarUsuario(id,datos) { return (await api.put(`/usuarios/${id}`,datos)).data }
export async function desactivarUsuario(id) { return api.delete(`/usuarios/${id}`) }
