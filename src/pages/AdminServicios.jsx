
import { useState } from 'react'
import FormularioServicio from '../components/organisms/FormularioServicio'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { serviciosIniciales } from '../utils/adaptarCatalogo'

function cargarServicios() {
  try {
    const guardados = localStorage.getItem('serviciosAdmin')
    return guardados ? JSON.parse(guardados) : serviciosIniciales
  } catch {
    return serviciosIniciales
  }
}

export default function AdminServicios() {
  const [servicios, setServicios] = useState(cargarServicios)
  const [editado, setEditado] = useState(null)

  function guardar(datos) {
    const actualizados = editado
      ? servicios.map((servicio) =>
          servicio.id === editado.id ? { ...servicio, ...datos } : servicio,
        )
      : [...servicios, datos]

    setServicios(actualizados)
    localStorage.setItem('serviciosAdmin', JSON.stringify(actualizados))
    setEditado(null)
  }

  function eliminar(id) {
    if (!window.confirm('¿Seguro que deseas eliminar este servicio?')) return

    const actualizados = servicios.filter((servicio) => servicio.id !== id)
    setServicios(actualizados)
    localStorage.setItem('serviciosAdmin', JSON.stringify(actualizados))
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
                      onClick={() => eliminar(servicio.id)}
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
