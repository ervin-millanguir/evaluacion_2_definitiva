import CampoTexto from '../atoms/CampoTexto'

export default function CampoFormulario({
  id,
  etiqueta,
  tipo = 'text',
  valor,
  onChange,
  placeholder = '',
  error = '',
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
      </label>

      <CampoTexto
        id={id}
        name={id}
        tipo={tipo}
        valor={valor}
        onChange={onChange}
        placeholder={placeholder}
        requerido
        error={error}
      />

      {error && (
        <div id={`${id}-error`} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  )
}