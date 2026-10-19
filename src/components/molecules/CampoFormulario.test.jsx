import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CampoFormulario from './CampoFormulario'

describe('CampoFormulario', () => {
  it('conecta la etiqueta, el valor y el mensaje de error', () => {
    render(
      <CampoFormulario
        id="nombre"
        etiqueta="Nombre"
        valor=""
        onChange={vi.fn()}
        error="Completa este campo."
      />,
    )

    const campo = screen.getByLabelText('Nombre')
    expect(campo).toHaveAttribute('name', 'nombre')
    expect(campo).toHaveClass('is-invalid')
    expect(screen.getByText('Completa este campo.')).toBeInTheDocument()
  })
})
