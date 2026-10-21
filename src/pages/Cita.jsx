import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { serviciosIniciales } from '../utils/adaptarCatalogo'

const datosIniciales = {
  servicioId: '',
  nombreMascota: '',
  especie: '',
  fecha: '',
  hora: '',
  motivo: '',
}

function fechaMinima() {
  return new Date().toISOString().split('T')[0]
}

export default function Cita() {
  const [searchParams] = useSearchParams()
  const servicioInicial = searchParams.get('servicio') || ''
  const [datos, setDatos] = useState(() => ({
    ...datosIniciales,
    servicioId: servicioInicial,
  }))
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState('formulario')

  const servicioSeleccionado = serviciosIniciales.find(
    (servicio) => String(servicio.id) === datos.servicioId,
  )

  function manejarCambio(event) {
    const { name, value } = event.target
    setDatos((anteriores) => ({ ...anteriores, [name]: value }))
    setErrores((anteriores) => ({ ...anteriores, [name]: '' }))
    setEstado('formulario')
  }

  function validar() {
    const nuevosErrores = {}

    if (!datos.servicioId) nuevosErrores.servicioId = 'Selecciona un servicio.'
    if (!datos.nombreMascota.trim()) {
      nuevosErrores.nombreMascota = 'Ingresa el nombre de tu mascota.'
    }
    if (!datos.especie) nuevosErrores.especie = 'Selecciona una especie.'
    if (!datos.fecha) nuevosErrores.fecha = 'Selecciona una fecha.'
    if (!datos.hora) nuevosErrores.hora = 'Selecciona una hora.'
    if (!datos.motivo.trim()) nuevosErrores.motivo = 'Indica el motivo de la cita.'

    if (datos.fecha && datos.fecha < fechaMinima()) {
      nuevosErrores.fecha = 'La fecha no puede ser anterior a hoy.'
    }

    return nuevosErrores
  }

  function manejarEnvio(event) {
    event.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      setEstado('error')
      return
    }

    setEstado('confirmacion')
  }

  function confirmarSolicitud() {
    try {
      localStorage.setItem(
        'ultimaCita',
        JSON.stringify({ ...datos, servicio: servicioSeleccionado?.nombre }),
      )
      setEstado('exito')
    } catch {
      setEstado('error-guardado')
    }
  }

  if (estado === 'exito') {
    return (
      <section className="container py-5">
        <div className="alert alert-success shadow-sm" role="status">
          <h1 className="h3">¡Solicitud enviada correctamente!</h1>
          <p className="mb-3">
            Recibimos tu solicitud. Nuestro equipo confirmará la hora contigo.
          </p>
          <Link to="/inicio" className="btn btn-success">
            Volver al inicio
          </Link>
        </div>
      </section>
    )
  }

  if (estado === 'error-guardado') {
    return (
      <section className="container py-5">
        <div className="alert alert-danger shadow-sm" role="alert">
          <h1 className="h3">No pudimos guardar tu solicitud</h1>
          <p>Inténtalo nuevamente o vuelve a comenzar el formulario.</p>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setEstado('formulario')}
          >
            Volver al formulario
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <h1 className="text-success">Solicita una cita</h1>
          <p className="text-muted">
            Completa los datos y revisa el resumen antes de confirmar.
          </p>

          {estado === 'error' && (
            <div className="alert alert-danger" role="alert">
              Revisa los campos marcados para continuar.
            </div>
          )}

          {estado === 'confirmacion' ? (
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4">Confirma tu solicitud</h2>
                <dl className="row">
                  <dt className="col-sm-4">Servicio</dt>
                  <dd className="col-sm-8">{servicioSeleccionado?.nombre}</dd>
                  <dt className="col-sm-4">Mascota</dt>
                  <dd className="col-sm-8">
                    {datos.nombreMascota} ({datos.especie})
                  </dd>
                  <dt className="col-sm-4">Fecha y hora</dt>
                  <dd className="col-sm-8">
                    {datos.fecha} a las {datos.hora}
                  </dd>
                  <dt className="col-sm-4">Motivo</dt>
                  <dd className="col-sm-8">{datos.motivo}</dd>
                </dl>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={confirmarSolicitud}
                  >
                    Confirmar solicitud
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setEstado('formulario')}
                  >
                    Editar datos
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form className="card card-body shadow-sm" onSubmit={manejarEnvio}>
              <label className="form-label" htmlFor="servicioId">
                Servicio
              </label>
              <select
                id="servicioId"
                name="servicioId"
                className={`form-select mb-2${errores.servicioId ? ' is-invalid' : ''}`}
                value={datos.servicioId}
                onChange={manejarCambio}
              >
                <option value="">Selecciona un servicio</option>
                {serviciosIniciales.map((servicio) => (
                  <option key={servicio.id} value={servicio.id}>
                    {servicio.nombre}
                  </option>
                ))}
              </select>
              {errores.servicioId && (
                <div className="invalid-feedback d-block mb-3">
                  {errores.servicioId}
                </div>
              )}

              <label className="form-label" htmlFor="nombreMascota">
                Nombre de la mascota
              </label>
              <input
                id="nombreMascota"
                name="nombreMascota"
                className={`form-control mb-3${errores.nombreMascota ? ' is-invalid' : ''}`}
                value={datos.nombreMascota}
                onChange={manejarCambio}
              />

              <label className="form-label" htmlFor="especie">
                Especie
              </label>
              <select
                id="especie"
                name="especie"
                className={`form-select mb-3${errores.especie ? ' is-invalid' : ''}`}
                value={datos.especie}
                onChange={manejarCambio}
              >
                <option value="">Selecciona una especie</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Ave">Ave</option>
                <option value="Otro">Otro</option>
              </select>

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="fecha">
                    Fecha
                  </label>
                  <input
                    id="fecha"
                    name="fecha"
                    type="date"
                    min={fechaMinima()}
                    className={`form-control mb-3${errores.fecha ? ' is-invalid' : ''}`}
                    value={datos.fecha}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="hora">
                    Hora
                  </label>
                  <input
                    id="hora"
                    name="hora"
                    type="time"
                    className={`form-control mb-3${errores.hora ? ' is-invalid' : ''}`}
                    value={datos.hora}
                    onChange={manejarCambio}
                  />
                </div>
              </div>

              <label className="form-label" htmlFor="motivo">
                Motivo de la cita
              </label>
              <textarea
                id="motivo"
                name="motivo"
                className={`form-control mb-3${errores.motivo ? ' is-invalid' : ''}`}
                rows="3"
                value={datos.motivo}
                onChange={manejarCambio}
              />

              <button type="submit" className="btn btn-success align-self-start">
                Revisar solicitud
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
