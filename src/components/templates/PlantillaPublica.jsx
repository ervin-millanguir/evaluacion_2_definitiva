import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'

export default function PlantillaPublica({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container py-4 flex-grow-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}