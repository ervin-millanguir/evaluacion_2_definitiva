import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import EtiquetaEspecie from './EtiquetaEspecie'

describe('EtiquetaEspecie', () => {
  it('muestra la especie recibida como etiqueta', () => {
    render(<EtiquetaEspecie especie="Perro" />)

    expect(screen.getByText('Perro')).toBeInTheDocument()
    expect(screen.getByText('Perro')).toHaveClass('badge')
  })
})
