import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../Context/ThemeContext';
import './Restaurante.css';

export default function Card(props) {
    const { name, address, id, image, hours } = props;
    const [aberto, setAberto] = useState(false);
    
    const [from, to, days]  = hours;
    let array = [];
    hours.map((item, index) => { 
        //console.log(item.from);
        const from = item.from.split(':');
        array.push(...from);
    });
    console.log(array);

    const todayDate = new Date();
    const day = todayDate.getDate();
    const hour = todayDate.getHours();
    
    useEffect(() => {
        hours.map((item, key) => {
        const scheduleFrom = item.from.split(':');
        const scheduleTo = item.to.split(':');
        if(item.days.includes(day) && hour >= scheduleFrom[0] && hour < scheduleTo[0]) {
            // console.log('from', scheduleFrom[0]);
            // console.log('to', scheduleTo[0]);
            setAberto(true);               
        }
        });
    }, []);


    const { theme } = useContext(ThemeContext);

    return(
        <div className={theme ? 'card card--dark' : 'card' }>
            <div className="card__content">
                <div className="logo">
                    <img src={image} alt="logo" />
                </div>
                <div className="info">
                    <span className="info--primary">{name}</span>
                    <span className="info--secondary">{address}</span>
                    <Link to={`/perfil/${id}`} className="info--acesso">Clique aqui para visitar</Link>
                </div>
                <div className="horario">
                {

                }
                {aberto ? 
                    <span className="schedule">Aberto</span>
                :
                    <span className="schedule">Fechado</span>
                }
                </div>
            </div>
        </div>
    )
}