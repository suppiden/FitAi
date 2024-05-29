import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Sesion from './Sesion'; 
import Inicio from './Inicio';
import Failed from './failed';
import Pago from './BotonPago';
import Home from './HomeFit';
//import HomePage from './HomePage';
import Replies from './Replies' 
import Forum from './Home'
import Test from './Test';
import ChatComponent from './Chat';
import ErrorComponent from './Error';
import Relleno from './Relleno';
import PaymentSuccess from './PaymentSucces';
import SuccessToken from './SuccesToken';
import SesionPrueba from './SesionPrueba';
import Registered from './Registered';

// Asume que tienes un componente para la sesión

function RouterWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<SesionPrueba />} />
        <Route path="/" element={<Home />} />
        <Route path="/sesion" element={<Sesion />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<App />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/forum" element={<Forum />} />
        <Route path='/:id/replies' element={<Replies />} />
        <Route path='/chat' element={<ChatComponent />} />
        <Route path='/error' element={<ErrorComponent />} />
        <Route path='/success' element={<SuccessToken />} />
        <Route path='/registered' element={<Registered />} />
        <Route path='/relleno' element={<Relleno />} />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </Router>
  );
}

export default RouterWrapper;