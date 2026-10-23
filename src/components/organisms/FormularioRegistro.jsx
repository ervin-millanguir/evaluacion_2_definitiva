import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import useAuth from '../../context/useAuth'
import {
  validarCampoObligatorio,
  validarClave,
  validarConfirmacionClave,
  validarCorreo,
} from '../../utils/validaciones'

const datosIniciales = {
  nombre: '',
  apellido: '',
  rut: '',
  correo: '',
  telefono: '',
  contrasena: '',
  confirmarContrasena: '',
}

const campos = [
  { id: 'nombre', etiqueta: 'Nombre' },
  { id: 'apellido', etiqueta: 'Apellido' },
  { id: 'rut', etiqueta: 'RUT', placeholder: '12.345.678-9' },
  {
    id: 'correo',
    etiqueta: 'Correo electrónico',
    tipo: 'email',
    placeholder: 'nombre@correo.cl',
  },
  {
    id: 'telefono',
    etiqueta: 'Teléfono',
    tipo: 'tel',
    placeholder: '+56 9 1234 5678',
  },
  { id: 'contrasena', etiqueta: 'Contraseña', tipo: 'password' },
  {
    id: 'confirmarContrasena',
    etiqueta: 'Confirmar contraseña',
    tipo: 'password',
  },
]

export default function FormularioRegistro() {
  const [datos, setDatos] = useState(datosIniciales)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)
  const { registrar } = useAuth()

  function manejarCambio(event) {
    const { name, value } = event.target

    setDatos((anteriores) => ({
      ...anteriores,
      [name]: value,
    }))

    setErrores({})
    setEnviado(false)
  }

  function manejarEnvio(event) {
    event.preventDefault()

    const nuevosErrores = {}

    for (const campo of ['nombre', 'apellido', 'rut', 'telefono']) {
      const error = validarCampoObligatorio(datos[campo])
      if (error) {
        nuevosErrores[campo] = error
      }
    }

    const errorCorreo = validarCorreo(datos.correo)
    if (errorCorreo) {
      nuevosErrores.correo = errorCorreo
    }

    const errorClave = validarClave(datos.contrasena)
    if (errorClave) {
      nuevosErrores.contrasena = errorClave
    }

    const errorConfirmacion = validarConfirmacionClave(
      datos.contrasena,
      datos.confirmarContrasena,
    )
    if (errorConfirmacion) {
      nuevosErrores.confirmarContrasena = errorConfirmacion
    }

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    const datosUsuario = { ...datos }
    delete datosUsuario.confirmarContrasena
    const resultado = registrar(datosUsuario)
    if (!resultado.ok) {
      setErrores({ correo: resultado.mensaje })
      return
    }

    setEnviado(true)
    setDatos(datosIniciales)
  }

  return (
    <form onSubmit={manejarEnvio}>
      <div className="row">
        {campos.map((campo) => (
          <div
            key={campo.id}
            className={
              campo.id === 'nombre' || campo.id === 'apellido'
                ? 'col-12 col-md-6'
                : 'col-12'
            }
          >
            <CampoFormulario
              {...campo}
              valor={datos[campo.id]}
              onChange={manejarCambio}
              error={errores[campo.id]}
            />
          </div>
        ))}
      </div>

      <Boton tipo="submit" variante="success">
        Registrarme
      </Boton>

      {enviado && (
        <div className="alert alert-success mt-3" role="status">
          ¡Registro completado! Ya puedes iniciar sesión con tu cuenta.
        </div>
      )}
    </form>
  )
}