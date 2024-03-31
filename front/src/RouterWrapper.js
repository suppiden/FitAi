import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Sesion from './Sesion'; 
import Inicio from './Inicio';
import Failed from './failed';
import Pago from './BotonPago';

// Asume que tienes un componente para la sesión

function RouterWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sesion" element={<Sesion />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<App />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/pago" element={<Pago />} />
      </Routes>
    </Router>
  );
}

export default RouterWrapper;