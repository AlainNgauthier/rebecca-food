import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../Context/ThemeContext';
import './Restaurante.css';

export default function Card(props) {

    const { theme } = useContext(ThemeContext);
    const { name, address, id, image, hours } = props;
    const [aberto, setAberto] = useState(false);
    // console.log(hours);

    let partitions = hours.length;
    let daysOpen = [];
    for(let i = 0; i < partitions; i++) {
        daysOpen[i] = {
            days : hours[i].days,
            start : hours[i].from,
            end : hours[i].to,
        }
    }
    console.log('daysOpen ', daysOpen);

    let diaHoje = new Date();
    const dia = diaHoje.getDay();
    console.log('dia de agora: ', dia);
    const hora = diaHoje.getHours();
    console.log('hora de agora: ', hora);
    
    useEffect(() => {
        for (let i = 0; i < partitions; i++) {
            const inicio = daysOpen[i].start.split(':');
            console.log('inicio ', parseInt(inicio[0]));
            const fechamento = daysOpen[i].end.split(':');
            console.log('fecha: ', parseInt(fechamento[0]));
            for (let j = 0; j < daysOpen[i].days.length; j++) {
                if(daysOpen[i].days[j] == dia 
                        && hora >= inicio[0] 
                            && hora < parseInt(fechamento[0])) {
                    console.log('yes');
                    setAberto(true);
                }
            }
        }
    }, [hora]);
    
    return(
        <Link to={`/perfil/${id}`}>
            <div className={theme ? 'card card--dark' : 'card' }>
                <div className="card__content">
                    <div className="logo">
                        <img src={image} alt="logo" />
                    </div>
                    <div className="info">
                        <span className="info--primary">{name}</span>
                        <span className="info--secondary">{address}</span>
                        
                    </div>
                    <div className="horario">
                        {aberto ? (
                            <span className="schedule">Aberto</span>
                        ) : (
                            <span className="schedule">Fechado</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}