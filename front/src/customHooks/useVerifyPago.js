import { useEffect, useState } from 'react';
import axios from 'axios';

const useVerifyPago = () => {
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const verificarPago = async () => {
            try {
                const response = await axios.get('http://localhost:8081/validarPago');
                if (isMounted) {
                    console.log("esto es en verifypagoooooooooo", response.data.success)
                    if (!response.data.success) {
                        setError("No ha pagado");
                    } else {
                        setUserId("ha pagado");
                    }
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error verificando el pago:', error);
                    setError("Tienes que pagar! Elige la opción de pago más abajo");
                }
            }
        };

        verificarPago();

        return () => {
            isMounted = false;
        };
    }, []);

    return { userId, error };
}

export default useVerifyPago;
