import { useState } from 'react'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'

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
      if (!datos[campo].trim()) {
        nuevosErrores[campo] = 'Completa este campo.'
      }
    }

    if (datos.contrasena.length < 8) {
      nuevosErrores.contrasena =
        'La contraseña debe tener al menos 8 caracteres.'
    }

    if (datos.contrasena !== datos.confirmarContrasena) {
      nuevosErrores.confirmarContrasena =
        'Las contraseñas no coinciden.'
    }

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
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
          ¡Formulario validado! El registro se envió de forma simulada.
        </div>
      )}
    </form>
  )
}