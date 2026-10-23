
import { Link, Route, Routes } from 'react-router-dom'

import PlantillaPublica from './components/templates/PlantillaPublica'

import Registro from './pages/Registro'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Categorias from './pages/Categorias'
import DetalleServicio from './pages/DetalleServicio'
import Cita from './pages/Cita'
import Login from './pages/Login'
import RutaProtegida from './components/organisms/RutaProtegida'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Registro />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/inicio"
        element={
          <PlantillaPublica>
            <Inicio />
          </PlantillaPublica>
        }
      />

      <Route
        path="/servicios"
        element={
          <PlantillaPublica>
            <Servicios />
          </PlantillaPublica>
        }
      />

      <Route
        path="/servicios/:id"
        element={
          <PlantillaPublica>
            <DetalleServicio />
          </PlantillaPublica>
        }
      />
      <Route
        path="/cita"
        element={
          <PlantillaPublica>
            <Cita />
          </PlantillaPublica>
        }
      />

      <Route
        path="/categorias"
        element={
          <PlantillaPublica>
            <Categorias />
          </PlantillaPublica>
        }
      />

      <Route
        path="/productos"
        element={
          <PlantillaPublica>
            <Productos />
          </PlantillaPublica>
        }
      />
      <Route
        path="/categoria/:nombre"
        element={
          <PlantillaPublica>
            <Productos />
          </PlantillaPublica>
        }
      />
      <Route
        path="/buscar/:texto"
        element={
          <PlantillaPublica>
            <Productos />
          </PlantillaPublica>
        }
      />
      <Route
        path="/admin"
        element={
          <RutaProtegida>
            <PlantillaPublica>
              <Productos modoAdministracion />
            </PlantillaPublica>
          </RutaProtegida>
        }
      />
      <Route
        path="/productos/:id"
        element={
          <PlantillaPublica>
            <DetalleProducto />
          </PlantillaPublica>
        }
      />

      <Route
        path="*"
        element={
          <main className="container py-5 text-center">
            <h1>Página no encontrada</h1>
            <p className="text-muted">
              La página que buscas no existe.
            </p>
            <Link to="/inicio" className="btn btn-success mt-3">
              Volver al inicio
            </Link>
          </main>
        }
      />
    </Routes>
  )
}
