import React, { Fragment, useState, useEffect, useCallback } from 'react';
import ReactDom from 'react-dom';
//import { Link } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Home.css';

import api from '../Services/api';
import Restaurante from '../Restaurante/index';

export default function Home() {
    const [filter, setFilter] = useState(false); //filtro
    const [restaurantes, setRestaurantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    

    const handleChange = event => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        async function load(){
            const resto = 'restaurants';
            const listaRestaurantes = await api.get(`/${resto}`);
            //console.log(listaRestaurantes.data);
            setRestaurantes(listaRestaurantes.data);
            //console.log(restaurantes);
            setLoading(false);
            //console.log(restaurantes);
        }

        /*const results = restaurantes.filter(resto => resto.name === searchTerm);
        setSearchResult(results);
        setFilter(true);*/

        load();
    },[]);


    const filtrando = useCallback((e) => {
        e.preventDefault();
        const results = restaurantes.filter(resto => resto.name === searchTerm);
        /* resto => resto.name === searchTerm */
        if(results) {
            setFilter(true);
            setSearchResult(results);
        }
    },[restaurantes, searchTerm]);
    
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
                    <form onSubmit={filtrando}>
                        <input 
                            type="text"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <button type="submit">
                            <BiSearchAlt2 size={22} />
                        </button>
                    </form>
                    {filter ? 
                        <div className="home--list">
                            {
                                searchResult.map((item, key) => (
                                    <Fragment key={key}>
                                        <Restaurante 
                                            name={item.name}
                                            address={item.address}
                                            image={item.image}
                                            id={item.id}
                                        />
                                    </Fragment>
                            ))}
                        </div> :
                        <div className="home--list">
                            {
                                restaurantes.map((item, key) => (
                                    <Fragment key={key}>
                                        <Restaurante 
                                            name={item.name}
                                            address={item.address}
                                            image={item.image}
                                            id={item.id}
                                        />
                                    </Fragment>
                            ))}
                        </div>
                    } 
                </div>
            </div>
        </Fragment>
    )
}