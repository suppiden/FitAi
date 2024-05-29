import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useVerifyEmail = (userId) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const verificarEmail = async () => {
            if (!userId) return;  // No verificar si no hay userId

            try {
                const response = await axios.get('http://localhost:8081/validarEmail');
                console.log("Respuesta del servidor:", response.data);
                if (!response.data.success) {
                    console.log("Error: Email no verificado");
                    setError("Revisa tu correo y verifica tu email");
                    navigate("/");
                }
            } catch (error) {
                console.error('Error al verificar el email:', error);
                setError("Algo ha pasado!");
            }
        };

        verificarEmail();
    }, [navigate, userId]);

    return error;
}

export default useVerifyEmail;
