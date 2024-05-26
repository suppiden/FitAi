import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./indexCatch.css";
import axios from "axios";
import { Tooltip } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
};

const Nav = ({ userId, error }) => {
  const navigate = useNavigate();
  const scrollDirection = useScrollDirection();

  const signOut = async () => {
    try {
      // Envía una petición al servidor para cerrar la sesión
      await axios.post('http://localhost:8081/logout');
      // Redirige al usuario a la página de inicio de sesión o portada
      navigate("/inicio");
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Manejar errores, por ejemplo, mostrando un mensaje de error
    }
  };

  const signIn = () => {
    navigate("/inicio");
  };

  return (
    <nav className={`navbar ${scrollDirection === "down" ? "hidden" : ""}`}>
      <h2 className="navSection" onClick={() => navigate("/")}>Fitai</h2>
      <div className="navbarRight">
        {userId ? (
          <>
          
          <Tooltip label={error ? "Finish the process to access!" : ""} shouldWrapChildren>
                    <div 
                        className={`navSection ${error ? 'disabled' : ''}`} 
                        onClick={() => !error && navigate("/sesion")} 
                        style={{ pointerEvents: error ? 'none' : 'auto' }}
                    >
                        Sesion
                    </div>
                </Tooltip>

                <Tooltip label={error ? "Finish the process to access!" : ""} shouldWrapChildren>
                    <div 
                        className={`navSection ${error ? 'disabled' : ''}`} 
                        onClick={() => !error && navigate("/forum")} 
                        style={{ pointerEvents: error ? 'none' : 'auto' }}
                    >
                        Foro
                    </div>
                </Tooltip>
                <Tooltip label={error ? "Finish the process to access!" : ""} shouldWrapChildren>
                    <div 
                        className={`navSection ${error ? 'disabled' : ''}`} 
                        onClick={() => !error && navigate("/Chat")} 
                        style={{ pointerEvents: error ? 'none' : 'auto' }}
                    >
                        Chat
                    </div>
                </Tooltip>
            <button onClick={signOut}>Sign out</button>
          </>
        ) : (
          <button onClick={signIn}>Sign in</button>
        )}
      </div>
    </nav>
  );
};

export default Nav;