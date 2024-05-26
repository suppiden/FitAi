import React from 'react';
import './relleno.css';

const Relleno = () => {
    return (
        <div className="contenedorRelleno">
            <div className="contenidoInfo">
                <p>
                    ¡<span className="conceptoClave grande">Loggete</span> y elige la <span className="conceptoClave opcionPago">opción de pago</span>! 
                    <span className="foros"> Accede a nuestros <span className="conceptoClave">foros</span> y comparte tu historia.</span> 
                    <span className="ia"> El uso de una <span className="conceptoClave">IA</span> no tiene por qué ser solitario </span>
                </p>
            </div>
            <div className="contenidoTitulo">
                <h2>Conoce nuestras historias de éxito</h2>
            </div>
        </div>
    );
}

export default Relleno;
