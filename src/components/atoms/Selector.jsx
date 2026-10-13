export default function Selector({
  id,
  name,
  valor,
  onChange,
  opciones = [],
  placeholder = 'Selecciona una opción',
  requerido = false,
}) {
  return (
    <select
      id={id}
      name={name}
      value={valor}
      onChange={onChange}
      required={requerido}
      className="form-select"
    >
      <option value="">{placeholder}</option>

      {opciones.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </select>
  )
}