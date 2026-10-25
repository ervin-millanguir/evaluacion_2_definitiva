
import { useState } from 'react'
import FormularioServicio from '../components/organisms/FormularioServicio'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import {
  actualizarServicio,
  crearServicio,
  eliminarServicio,
  listarServicios,
} from '../services/servicioService'

export default function AdminServicios() {
  const [servicios, setServicios] = useState(() => listarServicios())
  const [editado, setEditado] = useState(null)
  const [idPendienteEliminar, setIdPendienteEliminar] = useState(null)

  function guardar(datos) {
    if (editado) {
      actualizarServicio(editado.id, datos)
    } else {
      crearServicio(datos)
    }
    setServicios(listarServicios())
    setEditado(null)
  }

  function eliminar(id) {
    eliminarServicio(id)
    setServicios(listarServicios())
    setIdPendienteEliminar(null)
  }

  return (
    <PlantillaAdmin>
      <h1 className="mb-2">Administración de servicios</h1>
      <p className="text-muted">
        Crea, modifica y elimina los servicios veterinarios del catálogo administrativo.
      </p>

      <FormularioServicio
        key={editado?.id ?? 'nuevo'}
        servicioEditado={editado}
        onGuardar={guardar}
        onCancelar={() => setEditado(null)}
      />

      {idPendienteEliminar !== null && (
        <div className="alert alert-warning d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>¿Seguro que deseas eliminar este servicio?</span>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => eliminar(idPendienteEliminar)}
            >
              Sí, eliminar
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setIdPendienteEliminar(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <h2 className="h4 mt-4">Servicios registrados ({servicios.length})</h2>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-success">
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id}>
                <td>{servicio.codigo || servicio.id}</td>
                <td>{servicio.nombre}</td>
                <td>{servicio.categoria}</td>
                <td>
                  {Number(servicio.precio || 0).toLocaleString('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setEditado(servicio)}
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setIdPendienteEliminar(servicio.id)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlantillaAdmin>
  )
}
