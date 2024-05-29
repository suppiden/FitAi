import { Link } from "react-router-dom";
import man from '../src/manTest.png';
import woman from './woman2.png'
import Nav from './Nav';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './sesion.css';
import useVerifySession from "./customHooks/useVerifySession";
import useVerifyEmail from "./customHooks/useVerifyEmail";
import useVerifyPago from "./customHooks/useVerifyPago";

function Sesion() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const { userId } = useVerifySession();
    const emailError = useVerifyEmail();
    const { userId: pagoUserId, error: pagoError } = useVerifyPago();
    const [loading, setLoading] = useState(true); // Estado de carga



    useEffect(() => {
        if (emailError || pagoError) {
            navigate("/");
        } else {
            setLoading(false); // Cambiar el estado de carga a false
        }
    }, [emailError, pagoError, navigate]);





    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8081/user");
                if (isMounted) {
                    setName(response.data.name);
                    console.log(response.data.name);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Cambiar el estado de carga a false
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, []);

    const error = emailError || pagoError;

    useEffect(() => {
        if (emailError || pagoError) {
            navigate("/");
        } else {
            setLoading(false); // Cambiar el estado de carga a false
        }
    }, [emailError, pagoError, navigate]);

    if (loading) {
        return <div>Cargando...</div>; // Mostrar un mensaje de carga
    }

    return (
        <>
            <Nav userId={!!userId} />
            <p className="textSesion">Has iniciado sesión <span style={{ 
    color: '#6ca26b', 
    fontWeight: 'bold', 
    fontSize: '1.2em', 
    backgroundColor: '#e0f7e0', 
    padding: '5px 10px', 
    borderRadius: '10px', 
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    ':hover': {
        backgroundColor: '#6ca26b', 
        color: 'white', 
        transform: 'scale(1.1)'
    }
}}>{name}</span></p>
            <div style={{ position: 'absolute', top: '30vh', left: '13%', fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Explora nuestros chats</div>
<div style={{ position: 'absolute', top: '30vh', left: '66%', fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>Participa en los foros</div>
            <div className="barra"></div>
            <div className="containerSesion">
                <Link to="/chat">
                    <img src={woman} alt="Chat" className="imageSesion" />
                </Link>
                <Link to="/forum">
                    <img src={man} alt="Foro" className="imageSesion1" />
                </Link>
            </div>
        </>
    );
}

export default Sesion;
