import Hero from './Hero';
import { ChakraProvider } from '@chakra-ui/react';
import Testimonials from './Testimonials.js';
import Footer from './Footer.js'
import Catch from './Catch.js';
import Nav from './Nav.js';
import './indexCatch.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import Relleno from './Relleno.js';
import useVerifyEmail from "./customHooks/useVerifyEmail";
import useVerifyPago from "./customHooks/useVerifyPago";



function HomeFit() {

    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const emailError = useVerifyEmail();
    const { userId: pagoUserId, error: pagoError } = useVerifyPago();


  useEffect(() => {
    const verificarSesion = async () => {
      try {
        var response = await axios.get('http://localhost:8081/validarSesion'); // Asume que Axios está configurado globalmente para usar tu base URL
        if (!response.data.authenticated) {
          navigate("/");
          console.log("no se ha podido verificar")
        } else {
          console.log("Authenticated");
          setUserId(response.data.userId)
          
          console.log('esto es el user', response.data.userId)
        }
      } catch (error) {
        console.error('Error verificando la sesión:', error);
        navigate("/"); // Opcional: Redirigir al usuario si hay un error
      }
    };

    verificarSesion();
  }, [navigate]);

  console.log("pagoerror", pagoError)

  const error = emailError || pagoError;




  return (

    <>
    <Nav userId={!!userId} error={error}/>
<Catch error={error} />
    <ChakraProvider>
      <Hero userId={userId} error={emailError} />
       <Relleno/>
      <Testimonials/>
    </ChakraProvider>
   
     <Footer/>

     </> 

  );
}

export default HomeFit;