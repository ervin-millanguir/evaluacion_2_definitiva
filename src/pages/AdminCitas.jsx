
import { useState } from 'react'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitas from '../components/organisms/TablaCitas'
import {
  actualizarEstadoCita,
  listarCitas,
} from '../services/citaService'

export default function AdminCitas() {
  const [citas, setCitas] = useState(() => listarCitas())

  function cambiarEstado(id, estado) {
    actualizarEstadoCita(id, estado)
    setCitas(listarCitas())
  }

  return (
    <PlantillaAdmin>
      <h1 className="mb-2">Administración de citas</h1>
      <p className="text-muted">
        Revisa las solicitudes y actualiza su estado.
      </p>

      <div className="card card-body shadow-sm">
        <TablaCitas citas={citas} onCambiarEstado={cambiarEstado} />
      </div>
    </PlantillaAdmin>
  )
}
