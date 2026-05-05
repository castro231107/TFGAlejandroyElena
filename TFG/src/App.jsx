import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Inicio from '../frontend/pages/Inicio/Inicio'
import MiCuenta from '../frontend/pages/MiCuenta/MiCuenta'
import Tarjeta from '../frontend/pages/Tarjeta/Tarjeta'
import Noticias from '../frontend/pages/Noticias/Noticias'
import MiPerfil from '../frontend/pages/MiPerfil/MiPerfil'
import Header from '../frontend/components/Header/Header'
import Footer from '../frontend/components/Footer/Footer'

function AppContent() {
  const location = useLocation();
  const isInicio = location.pathname === '/';

  return (
    <div className="app-wrapper">
      {!isInicio && <Header />}
      {/*las llaves es para meter contenido de JS*/}
      {/*&& significa que se muestre si es verdadero y no se muestre si es falso*/}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/micuenta" element={<MiCuenta />} />
          <Route path="/tarjeta" element={<Tarjeta />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/miperfil" element={<MiPerfil />} />
        </Routes>
      </div>
      {!isInicio && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
