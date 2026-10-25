
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'

export default function PlantillaPublica({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100 plantilla-publica">
      <Navbar />

      <main className="container py-4 py-md-5 flex-grow-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}
