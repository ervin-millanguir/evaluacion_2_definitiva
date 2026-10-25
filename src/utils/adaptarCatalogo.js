import catalogo from '../data/productos.json'
import { emojiProducto, emojiServicio } from './iconosCatalogo'

const filasServicios = catalogo.Servicios
const filasProductos = catalogo['Medicamentos y Vacunas']

if (!Array.isArray(filasServicios) || !Array.isArray(filasProductos)) {
  throw new Error(
    'El JSON debe contener las listas Servicios y Medicamentos y Vacunas.',
  )
}

export const serviciosIniciales = filasServicios
  .filter((fila) =>
    /^(SV|VA|CI|DE|EX|OT)\d+$/.test(
      String(fila['VETERINARIA SAN MARCOS'] ?? '').trim(),
    ),
  )
  .map((fila, indice) => ({
    id: indice + 1,
    codigo: String(fila['VETERINARIA SAN MARCOS']).trim(),
    categoria: fila.Column2,
    nombre: fila.Column3,
    especie: fila.Column4,
    duracion: fila.Column5,
    precio: Number(fila.Column6),
    observaciones: fila.Column7 ?? '',
    emoji: emojiServicio(fila.Column2),
  }))

export const productosIniciales = filasProductos
  .filter((fila) =>
    /^ME\d+$/.test(
      String(fila['VETERINARIA SAN MARCOS'] ?? '').trim(),
    ),
  )
  .map((fila, indice) => ({
    id: indice + 1,
    codigo: String(fila['VETERINARIA SAN MARCOS']).trim(),
    categoria: fila.Column2,
    nombre: fila.Column3,
    principioActivo: fila.Column4,
    presentacion: fila.Column5,
    especie: fila.Column6,
    stock: Number(fila.Column7),
    precio: Number(fila.Column8),
    emoji: emojiProducto(fila.Column2),
  }))