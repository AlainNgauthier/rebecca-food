import React, { Fragment, useState, useEffect } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Home.css';

import api from '../Services/api';
import Restaurante from '../Restaurante/index';

export default function Home() {

    const [restaurantes, setRestaurantes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load(){
            const resto = 'restaurants';
            const listaRestaurantes = await api.get(`/${resto}`);
            //console.log(listaRestaurantes.data);

            setRestaurantes(listaRestaurantes.data);
            //console.log(restaurantes);

            setLoading(false);
            console.log(restaurantes);
        }

        load();
    }, [])

    if(loading) {
        return(
            <div className="home__loading">
                Carregando...
            </div>
        )
    }

    return(
        <Fragment>
            <div className="home">
                <div className="home__wrap">
                    <div className="home--title">
                        <span>Bem-vindo ao Rebecca Food</span>
                    </div>
                    <form onSubmit={() => {}}>
                        <input 
                            type="text"
                            placeholder="Buscar estabelecimento"
                            
                            onChange={() => {}}
                        />
                        <button type="submit">
                            <BiSearchAlt2 size={22} />
                        </button>
                    </form>
                    <div className="home--list">
                        {restaurantes.map((item, key) => (
                            <Fragment key={key}>
                                <Restaurante 
                                    name={item.name}
                                    address={item.address}
                                    image={item.image}
                                    />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}