import React from 'react';
import { Link } from 'react-router-dom';
import './Restaurante.css';

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
                    <Link to={`/perfil/${props.id}`} className="info--acesso">Clique aqui para visitar</Link>
                </div>
                <div className="horario">
                    Aberto <br/> agora
                </div>
            </div>
        </div>
    )
}