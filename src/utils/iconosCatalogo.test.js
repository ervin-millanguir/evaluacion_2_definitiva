import { describe, expect, it } from 'vitest'
import { emojiProducto, emojiServicio } from './iconosCatalogo'

describe('iconos del catálogo', () => {
  it('asigna emojis a categorías conocidas y un valor seguro a otras', () => {
    expect(emojiProducto('Vacunas')).toBe('💉')
    expect(emojiServicio('Consultas')).toBe('🩺')
    expect(emojiProducto('Categoría nueva')).toBe('🐾')
  })
})
