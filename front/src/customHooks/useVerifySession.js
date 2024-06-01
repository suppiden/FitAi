import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useVerifySession = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);  // Almacenamos el userId en el estado
    const [error, setError] = useState(null);   // Manejo de errores

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const response = await axios.get('http://localhost:8081/validarSesion');
                if (!response.data.authenticated) {
                    navigate("/");
                    console.log("baaaaaaaaa")
                    setError("No autenticado");
                } else {
                    setUserId(response.data.userId);
                    console.log("beeeeeeee")
                }
            } catch (error) {
                console.error('Error verificando la sesión:', error);
                navigate("/");
                setError("Error en la verificación de la sesión");
            }
        };

        verificarSesion();
    }, [navigate]); // Dependencias del useEffect

    return { userId, error };
}

export default useVerifySession;
