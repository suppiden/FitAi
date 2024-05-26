import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const  useVerifyEmail = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);  // Solo manejo de errores, userId no es utilizado aquí

    useEffect(() => {
        const verificarEmail = async () => {
            try {
                const response = await axios.get('http://localhost:8081/validarEmail');
                console.log("Respuesta del servidor:", response.data); // Log general de la respuesta
                if (!response.data.success) {
                    console.log("Error: Email no verificado"); // Mensaje específico de error
                    setError("Revisa tu correo y verifica tu email");
                    navigate("/");
                }
            } catch (error) {
                console.error('Error al verificar el email:', error); // Captura el error
                setError("Algo ha pasado!"); // Mensaje general de error
            }
        };

        verificarEmail();
    }, [navigate]); // Dependencias del useEffect
    console.log(error, 'esto es en verify')
    return  error ;
}

export default useVerifyEmail;
