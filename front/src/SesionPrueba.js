import { Link } from "react-router-dom";
import man from '../src/manTest.png';
import woman from './woman2.png';
import Nav from './Nav';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './sesionPrueba.css';
import useVerifySession from "./customHooks/useVerifySession";
import useVerifyEmail from "./customHooks/useVerifyEmail";
import useVerifyPago from "./customHooks/useVerifyPago";
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
    const { userId } = useVerifySession();
    const emailError = useVerifyEmail();
    const {  error: pagoError } = useVerifyPago();
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
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
            setLoading(false);
        }
    }, [emailError, pagoError, navigate]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Nav userId={!!userId} />
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
