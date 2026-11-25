import { Link, Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth'
import FormularioRegistro from '../components/organisms/FormularioRegistro'

export default function Registro() {
  const { estaAutenticado } = useAuth()
  if (estaAutenticado) return <Navigate to='/inicio' replace />
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <section className="card shadow-sm">
            <div className="card-body p-4">
              <header className="text-center mb-4">
                <h1 className="text-success">HAPPY PAWS</h1>
                <p className="text-muted">
                  Veterinaria y tienda para mascotas
                </p>
                <h2 className="h4">Registro de cliente</h2>
                <p>Completa tus datos para registrarte.</p>
              </header>

              <FormularioRegistro />

              <div className="text-center mt-4">
                <Link to="/login">Ya tengo una cuenta</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
