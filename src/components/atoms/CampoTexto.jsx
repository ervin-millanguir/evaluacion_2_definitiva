export default function CampoTexto({
  id,
  name,
  tipo = 'text',
  valor,
  onChange,
  placeholder = '',
  requerido = false,
  error = '',
}) {
  return (
    <input
      id={id}
      name={name}
      type={tipo}
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
      required={requerido}
      className={`form-control${error ? ' is-invalid' : ''}`}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
    />
  )
}