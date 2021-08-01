import React, { Fragment, useState, useEffect, useCallback, useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Home.css';

import api from '../Services/api';
import Card from '../Card/index';

export default function Home() {
    const [filter, setFilter] = useState(false);
    const [cards, setCards] = useState([]);
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
            const listaCards = await api.get(`/${resto}`);
            setCards(listaCards.data);
            //console.log(cards);
            setLoading(false);
        }
        load();

    },[]);


    const filtrando = useCallback((e) => {
        e.preventDefault();

        if(searchTerm === ''){
            setFilter(false)
        }

        const results = cards.filter(resto => resto.name.toLowerCase().includes(searchTerm.toLowerCase()));
        //deixar tudo em minísculo pra facilitar a busca
        if(results) {
            setFilter(true);
            setSearchResult(results);
        }
        
    },[cards, searchTerm]);
    
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
                                        <Card 
                                            name={item.name}
                                            address={item.address}
                                            image={item.image}
                                            id={item.id}
                                            hours={item.hours}
                                        />
                                    </Fragment>
                            ))}
                        </div> :
                        <div className="home--list">
                            {
                                cards.map((item, key) => (
                                    <Fragment key={key}>
                                        {key !== 2 && 
                                            <Card 
                                                name={item.name}
                                                address={item.address}
                                                image={item.image}
                                                id={item.id}
                                                hours={item.hours}
                                            />
                                        
                                        }
                                    </Fragment>
                            ))}
                        </div>
                    } 
                </div>
            </div>
        </Fragment>
    )
}