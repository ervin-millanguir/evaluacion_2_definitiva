export default function EtiquetaEstadoCita({ estado = '' }) {
  const colores = {
    pendiente: 'warning',
    confirmada: 'success',
    cancelada: 'danger',
    atendida: 'secondary',
  }

  const color = colores[estado.toLowerCase()] ?? 'secondary'

  return (
    <span className={`badge rounded-pill text-bg-${color}`}>
      {estado}
    </span>
  )
}