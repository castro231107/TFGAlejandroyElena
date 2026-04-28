import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../frontend/pages/Inicio/Inicio'
import MiCuenta from '../frontend/pages/MiCuenta/MiCuenta'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/micuenta" element={<MiCuenta />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
