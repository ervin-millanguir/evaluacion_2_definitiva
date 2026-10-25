const emojisProductos = {
  Alimentos: '🥣',
  Antibióticos: '💊',
  Antiparasitarios: '🛡️',
  Antiinflamatorios: '🩹',
  Analgésicos: '💊',
  Vacunas: '💉',
  Dermatología: '🧴',
  Digestivo: '🧪',
  Cardíaco: '❤️',
  Suplementos: '🍖',
}

const emojisServicios = {
  Consultas: '🩺',
  Vacunación: '💉',
  Cirugía: '🏥',
  Desparasitación: '🛡️',
  Exámenes: '🔬',
  Otros: '🐾',
}

export function emojiProducto(categoria) {
  return emojisProductos[categoria] || '🐾'
}

export function emojiServicio(categoria) {
  return emojisServicios[categoria] || '🐾'
}
