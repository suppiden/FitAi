import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Sesion from './Sesion'; 
import Inicio from './Inicio';
import Failed from './failed';
import Pago from './BotonPago';
import Home from './Home';
import HomePage from './HomePage';
import Replies from './Replies' 
import ChatComponent from './Chat';
import ErrorComponent from './Error';

// Asume que tienes un componente para la sesión

function RouterWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sesion" element={<Sesion />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<App />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/forum" element={<Home />} />
        <Route path='/:id/replies' element={<Replies />} />
        <Route path='/chat' element={<ChatComponent />} />
        <Route path='/error' element={<ErrorComponent />} />
      </Routes>
    </Router>
  );
}

export default RouterWrapper;