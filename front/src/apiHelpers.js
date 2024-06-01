import axios from 'axios';

export const verifySession = async () => {
    try {
        const response = await axios.get('http://localhost:8081/validarSesion');
        if (!response.data.authenticated) {
            return { userId: null, error: "No autenticado" };
        } else {
            return { userId: response.data.userId, error: null };
        }
    } catch (err) {
        console.error('Error verificando la sesión:', err);
        return { userId: null, error: "Error en la verificación de la sesión" };
    }
}

export const verifyEmail = async (userId) => {
    if (!userId) return null;
    try {
        const response = await axios.get('http://localhost:8081/validarEmail');
        if (!response.data.success) {
            return "Revisa tu correo y verifica tu email";
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error al verificar el email:', err);
        return "Algo ha pasado!";
    }
}

export const verifyPago = async (userId) => {
    if (!userId) return { pagoStatus: null, error: null };
    try {
        const response = await axios.get('http://localhost:8081/validarPago');
        if (response.data.success) {
            return { pagoStatus: "ha pagado", error: null };
        } else {
            return { pagoStatus: null, error: "Realiza el pago" };
        }
    } catch (err) {
        console.error('Error verificando el pago:', err);
        return { pagoStatus: null, error: "Tienes que pagar! Elige la opción de pago más abajo" };
    }
}
