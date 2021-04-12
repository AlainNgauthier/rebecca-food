import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../Context/ThemeContext';
import './Restaurante.css';
import Horario from '../Horario/Horario';

export default function Restaurante(props) {

    const { theme } = useContext(ThemeContext);
//
    return(
        <div className={theme ? 'card card--dark' : 'card' }>
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
                    <Horario />
                </div>
            </div>
        </div>
    )
}