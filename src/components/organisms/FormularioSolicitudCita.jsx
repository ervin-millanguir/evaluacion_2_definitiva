
import { useState } from 'react'
import { serviciosIniciales } from '../../utils/adaptarCatalogo'

const datosIniciales = {
  servicioId: '',
  nombreMascota: '',
  especie: '',
  fecha: '',
  hora: '',
  motivo: '',
}

function obtenerFechaMinima() {
  const fecha = new Date()
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')

  return `${anio}-${mes}-${dia}`
}

export default function FormularioSolicitudCita({
  onSolicitar,
  servicioInicial = '',
}) {
  const [datos, setDatos] = useState({
    ...datosIniciales,
    servicioId: String(servicioInicial),
  })

  const [errores, setErrores] = useState({})

  function manejarCambio(event) {
    const { name, value } = event.target

    setDatos((actuales) => ({
      ...actuales,
      [name]: value,
    }))

    setErrores((actuales) => ({
      ...actuales,
      [name]: '',
    }))
  }

  function validar() {
    const nuevosErrores = {}

    if (!datos.servicioId) {
      nuevosErrores.servicioId = 'Selecciona un servicio.'
    }

    if (!datos.nombreMascota.trim()) {
      nuevosErrores.nombreMascota = 'Ingresa el nombre de tu mascota.'
    }

    if (!datos.especie) {
      nuevosErrores.especie = 'Selecciona una especie.'
    }

    if (!datos.fecha) {
      nuevosErrores.fecha = 'Selecciona una fecha.'
    } else if (datos.fecha < obtenerFechaMinima()) {
      nuevosErrores.fecha = 'La fecha no puede ser anterior a hoy.'
    }

    if (!datos.hora) {
      nuevosErrores.hora = 'Selecciona una hora.'
    }

    if (!datos.motivo.trim()) {
      nuevosErrores.motivo = 'Indica el motivo de la cita.'
    }

    return nuevosErrores
  }

  function manejarEnvio(event) {
    event.preventDefault()

    const nuevosErrores = validar()
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    const servicio = serviciosIniciales.find(
      (item) => String(item.id) === datos.servicioId
    )

    const solicitud = {
      ...datos,
      servicio: servicio?.nombre || 'Servicio veterinario',
      estado: 'Pendiente',
      fechaSolicitud: new Date().toISOString(),
    }

    if (typeof onSolicitar === 'function') {
      onSolicitar(solicitud)
    } else {
      try {
        const citasGuardadas = JSON.parse(
          localStorage.getItem('misCitas') || '[]'
        )

        const nuevaCita = {
          ...solicitud,
          id: `CITA-${Date.now()}`,
        }

        localStorage.setItem(
          'misCitas',
          JSON.stringify([...citasGuardadas, nuevaCita])
        )

        localStorage.setItem('ultimaCita', JSON.stringify(nuevaCita))

        window.location.assign('/cita-resultado')
      } catch {
        setErrores({
          general: 'No se pudo guardar la solicitud. Inténtalo nuevamente.',
        })
      }
    }
  }

  return (
    <form className="card card-body shadow-sm" onSubmit={manejarEnvio}>
      <h2 className="h4 mb-4">Datos de la cita</h2>

      {errores.general && (
        <div className="alert alert-danger" role="alert">
          {errores.general}
        </div>
      )}

      <label htmlFor="servicioId" className="form-label">
        Servicio veterinario
      </label>
      <select
        id="servicioId"
        name="servicioId"
        className={`form-select mb-2${errores.servicioId ? ' is-invalid' : ''}`}
        value={datos.servicioId}
        onChange={manejarCambio}
        required
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

      <label htmlFor="nombreMascota" className="form-label mt-3">
        Nombre de la mascota
      </label>
      <input
        id="nombreMascota"
        name="nombreMascota"
        type="text"
        className={`form-control${errores.nombreMascota ? ' is-invalid' : ''}`}
        value={datos.nombreMascota}
        onChange={manejarCambio}
        required
      />
      {errores.nombreMascota && (
        <div className="invalid-feedback">{errores.nombreMascota}</div>
      )}

      <label htmlFor="especie" className="form-label mt-3">
        Especie
      </label>
      <select
        id="especie"
        name="especie"
        className={`form-select${errores.especie ? ' is-invalid' : ''}`}
        value={datos.especie}
        onChange={manejarCambio}
        required
      >
        <option value="">Selecciona una especie</option>
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
        <option value="Ave">Ave</option>
        <option value="Otro">Otro</option>
      </select>
      {errores.especie && (
        <div className="invalid-feedback">{errores.especie}</div>
      )}

      <div className="row mt-3">
        <div className="col-md-6">
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            min={obtenerFechaMinima()}
            className={`form-control${errores.fecha ? ' is-invalid' : ''}`}
            value={datos.fecha}
            onChange={manejarCambio}
            required
          />
          {errores.fecha && (
            <div className="invalid-feedback">{errores.fecha}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="hora" className="form-label">
            Hora
          </label>
          <input
            id="hora"
            name="hora"
            type="time"
            className={`form-control${errores.hora ? ' is-invalid' : ''}`}
            value={datos.hora}
            onChange={manejarCambio}
            required
          />
          {errores.hora && (
            <div className="invalid-feedback">{errores.hora}</div>
          )}
        </div>
      </div>

      <label htmlFor="motivo" className="form-label mt-3">
        Motivo de la consulta
      </label>
      <textarea
        id="motivo"
        name="motivo"
        rows="3"
        className={`form-control${errores.motivo ? ' is-invalid' : ''}`}
        value={datos.motivo}
        onChange={manejarCambio}
        placeholder="Describe brevemente el motivo de la cita"
        required
      />
      {errores.motivo && (
        <div className="invalid-feedback">{errores.motivo}</div>
      )}

      <button type="submit" className="btn btn-success mt-4">
        Solicitar cita
      </button>
    </form>
  )
}
