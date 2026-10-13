export default function Boton({
  children,
  tipo = 'button',
  variante = 'primary',
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={tipo}
      className={`btn btn-${variante}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}