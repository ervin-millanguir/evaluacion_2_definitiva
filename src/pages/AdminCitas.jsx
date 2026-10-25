
import { useState } from 'react'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitas from '../components/organisms/TablaCitas'

function cargarCitas() {
  try {
    return JSON.parse(localStorage.getItem('misCitas') || '[]')
  } catch {
    return []
  }
}

export default function AdminCitas() {
  const [citas, setCitas] = useState(cargarCitas)

  function cambiarEstado(id, estado) {
    const actualizadas = citas.map((cita) =>
      cita.id === id ? { ...cita, estado } : cita,
    )

    setCitas(actualizadas)
    localStorage.setItem('misCitas', JSON.stringify(actualizadas))

    const ultima = JSON.parse(localStorage.getItem('ultimaCita') || 'null')
    if (ultima?.id === id) {
      localStorage.setItem(
        'ultimaCita',
        JSON.stringify({ ...ultima, estado }),
      )
    }
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
