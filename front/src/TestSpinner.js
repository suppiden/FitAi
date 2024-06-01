import { Link, useNavigate } from "react-router-dom";
import man from '../src/manTest.png';
import woman from './woman2.png';
import Nav from './Nav';
import { useEffect, useState } from "react";
import axios from "axios";
import './sesionPrueba.css';
import styled from 'styled-components';

const UserName = styled.span`
  color: #6ca26b;
  font-weight: bold;
  font-size: 1.2em;
  background-color: #e0f7e0;
  padding: 5px 10px;
  border-radius: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #6ca26b;
    color: white;
    transform: scale(1.1);
  }
`;

function SesionPrueba() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyUser = async () => {
            const userId = localStorage.getItem("_id");
            if (!userId) {
                navigate("/");
                return;
            }

            try {
                const [sessionRes, emailRes, pagoRes] = await Promise.all([
                    axios.get(`http://localhost:8081/verify-session/${userId}`),
                    axios.get(`http://localhost:8081/verify-email/${userId}`),
                    axios.get(`http://localhost:8081/verify-pago/${userId}`)
                ]);

                if (!sessionRes.data.success || !emailRes.data.success || !pagoRes.data.success) {
                    setError('Error en la verificación. Redirigiendo...');
                    setTimeout(() => navigate("/"), 2000);
                } else {
                    const userRes = await axios.get(`http://localhost:8081/user/${userId}`);
                    setName(userRes.data.name);
                    setLoading(false);
                }
            } catch (error) {
                setError('Error al verificar el usuario. Redirigiendo...');
                setTimeout(() => navigate("/"), 2000);
            }
        };

        verifyUser();
    }, [navigate]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Nav userId={!!localStorage.getItem("_id")} />
            <p className="textSesion">Has iniciado sesión <UserName>{name}</UserName></p>
            <div className="containerSesion">
                <div className="item">
                    <div className="exploraChats">Explora nuestros chats</div>
                    <Link to="/chat">
                        <img src={woman} alt="Chat" className="imageSesion" />
                    </Link>
                </div>
                <div className="item">
                    <div className="participaForos">Participa en los foros</div>
                    <Link to="/forum">
                        <img src={man} alt="Foro" className="imageSesion1" />
                    </Link>
                </div>
            </div>
            <div className="barra"></div>
        </>
    );
}

export default SesionPrueba;
