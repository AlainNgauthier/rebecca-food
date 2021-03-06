import React, { Fragment, useState, useEffect, useCallback, useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
//import { Link } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Home.css';

import api from '../Services/api';
import Restaurante from '../Restaurante/index';

export default function Home() {
    const [filter, setFilter] = useState(false); //filtro de resto
    const [restaurantes, setRestaurantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    
    const { theme } = useContext(ThemeContext);

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
        load();

    },[]);


    const filtrando = useCallback((e) => {
        e.preventDefault();

        if(searchTerm === ''){
            setFilter(false)
        }

        const results = restaurantes.filter(resto => resto.name.toLowerCase().includes(searchTerm.toLowerCase()));
        //deixar tudo em minísculo pra facilitar a busca
        /* resto => resto.name === searchTerm */
        if(results) {
            setFilter(true);
            setSearchResult(results);
            //console.log(searchResult);
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
            <div className={theme ? 'home dark--home' : 'home'}>
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