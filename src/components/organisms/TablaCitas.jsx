
export default function TablaCitas({ citas = [], onCambiarEstado }) {
  if (citas.length === 0) {
    return <div className="alert alert-info">No hay citas registradas.</div>
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-success">
          <tr>
            <th>Servicio</th>
            <th>Mascota</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.servicio}</td>
              <td>{cita.nombreMascota}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.estado}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  aria-label={`Cambiar estado de ${cita.nombreMascota}`}
                  value={cita.estado}
                  onChange={(event) =>
                    onCambiarEstado?.(cita.id, event.target.value)
                  }
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="No agendada">No agendada</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
