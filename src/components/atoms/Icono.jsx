export default function Icono({ simbolo = '🐾', etiqueta = '' }) {
  return (
    <span
      role={etiqueta ? 'img' : undefined}
      aria-label={etiqueta || undefined}
      aria-hidden={etiqueta ? undefined : true}
    >
      {simbolo}
    </span>
  )
}