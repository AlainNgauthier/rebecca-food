import React from 'react';
import './Restaurante.css'

export default function Restaurante(props) {


    return(
        <div className="card">
            <div className="card__content">
                <div className="logo">
                    <img src={props.image} alt="logo" />
                </div>
                <div className="info">
                    <span className="info--primary">{props.name}</span>
                    <span className="info--secondary">{props.address}</span>
                </div>
                <div className="horario">
                    Aberto <br/> agora
                </div>
            </div>
        </div>
    )
}