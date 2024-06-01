import { useEffect, useState } from 'react';
import axios from 'axios';

const useVerifyPago = (userId) => {
    const [pagoStatus, setPagoStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verificarPago = async () => {
            if (!userId) return;  // No verificar si no hay userId

            try {
                const response = await axios.get('http://localhost:8081/validarPago');
                if (response.data.success) {
                    setPagoStatus("ha pagado");
                } else {
                    setError("Realiza el pago");
                }
            } catch (error) {
                console.error('Error verificando el pago:', error);
                setError("Tienes que pagar! Elige la opción de pago más abajo");
            }
        };

        verificarPago();
    }, [userId]);

    return { pagoStatus, error };
}

export default useVerifyPago;
