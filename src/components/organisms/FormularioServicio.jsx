
import { useState } from 'react'

const inicial = {
  codigo: '',
  categoria: '',
  nombre: '',
  especie: '',
  duracion: '',
  precio: '',
  observaciones: '',
}

function datosDesdeServicio(servicio) {
  return servicio
    ? {
        ...inicial,
        ...servicio,
        precio: String(servicio.precio ?? ''),
      }
    : inicial
}

export default function FormularioServicio({
  servicioEditado,
  onGuardar,
  onCancelar,
}) {
  const [datos, setDatos] = useState(() => datosDesdeServicio(servicioEditado))

  function cambiar(event) {
    setDatos({ ...datos, [event.target.name]: event.target.value })
  }

  function enviar(event) {
    event.preventDefault()

    onGuardar({
      ...datos,
      id: servicioEditado?.id ?? Date.now(),
      precio: Number(datos.precio),
    })

    if (!servicioEditado) setDatos(inicial)
  }

  return (
    <form className="card card-body shadow-sm mb-4" onSubmit={enviar}>
      <h2 className="h4">
        {servicioEditado ? 'Editar servicio' : 'Agregar servicio'}
      </h2>

      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label" htmlFor="codigo">Código</label>
          <input
            id="codigo"
            name="codigo"
            className="form-control"
            value={datos.codigo}
            onChange={cambiar}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor="categoria">Categoría</label>
          <input
            id="categoria"
            name="categoria"
            className="form-control"
            value={datos.categoria}
            onChange={cambiar}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor="nombre">Nombre del servicio</label>
          <input
            id="nombre"
            name="nombre"
            className="form-control"
            value={datos.nombre}
            onChange={cambiar}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor="especie">Especie</label>
          <input
            id="especie"
            name="especie"
            className="form-control"
            value={datos.especie}
            onChange={cambiar}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor="duracion">Duración</label>
          <input
            id="duracion"
            name="duracion"
            className="form-control"
            value={datos.duracion}
            onChange={cambiar}
            placeholder="Ej.: 30 min"
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor="precio">Precio (CLP)</label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            className="form-control"
            value={datos.precio}
            onChange={cambiar}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="observaciones">Observaciones</label>
          <textarea
            id="observaciones"
            name="observaciones"
            className="form-control"
            rows="2"
            value={datos.observaciones}
            onChange={cambiar}
          />
        </div>
      </div>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-success" type="submit">
          {servicioEditado ? 'Guardar cambios' : 'Crear servicio'}
        </button>
        {servicioEditado && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
