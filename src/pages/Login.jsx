import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CampoFormulario from '../components/molecules/CampoFormulario'
import Boton from '../components/atoms/Boton'
import useAuth from '../context/useAuth'

export default function Login() {
  const [datos, setDatos] = useState({ correo: '', contrasena: '' })
  const [error, setError] = useState('')
  const { iniciarSesion } = useAuth()
  const navegar = useNavigate()
  const location = useLocation()

  function manejarCambio(event) {
    const { name, value } = event.target
    setDatos((anteriores) => ({ ...anteriores, [name]: value }))
    setError('')
  }

  function manejarEnvio(event) {
    event.preventDefault()

    if (!datos.correo.trim() || !datos.contrasena) {
      setError('Completa tu correo electrónico y contraseña.')
      return
    }

    const resultado = iniciarSesion(datos.correo, datos.contrasena)
    if (!resultado.ok) {
      setError(resultado.mensaje)
      return
    }

    navegar(location.state?.desde || '/inicio', { replace: true })
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
          <section className="card shadow-sm">
            <div className="card-body p-4">
              <header className="text-center mb-4">
                <h1 className="text-success">Iniciar sesión</h1>
                <p className="text-muted">
                  Accede a tu cuenta de Happy Paws.
                </p>
              </header>

              <form onSubmit={manejarEnvio}>
                <CampoFormulario
                  id="correo"
                  etiqueta="Correo electrónico"
                  tipo="email"
                  valor={datos.correo}
                  onChange={manejarCambio}
                  placeholder="nombre@correo.cl"
                />
                <CampoFormulario
                  id="contrasena"
                  etiqueta="Contraseña"
                  tipo="password"
                  valor={datos.contrasena}
                  onChange={manejarCambio}
                />

                <Boton tipo="submit" variante="success">
                  Ingresar
                </Boton>

                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
              </form>

              <p className="text-center mt-4 mb-0">
                ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
