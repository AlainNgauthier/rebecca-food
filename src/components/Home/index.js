import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import Loader from '../Loader';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Home.css';

import api from '../Services/api';
import Card from '../Card/index';

export default function Home() {
    const [filter, setFilter] = useState(false);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    
    const { theme } = useContext(ThemeContext);

    const handleChange = e => {
        const { name, value } = e.target;
        setSearchTerm(value);
        filtrando();
    }

    useEffect(() => {
        
        async function load(){
            const resto = 'restaurants';
            const listaCards = await api.get(`/${resto}`);
            setCards(listaCards.data);
            setLoading(false);
        }
        load();
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        filtrando();
    }

    const filtrando = useCallback(() => {
        if (searchTerm === ''){
            setFilter(false);
        }

        const results = cards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));

        if (results.length > 0) {
            setSearchResult(results);
            setFilter(true);
        } else {
            setFilter(false);
        }
    }, [cards, searchTerm]);
    
    if (loading) {
        return(
            <div className="home__loading">
                <Loader />
            </div>
        )
    }

    return(
        <>
            <main className={theme ? 'home dark--home' : 'home'}>
                <div className="home__wrap">
                    <div className="home--title">
                        <h1>Bem-vindo ao Rebecca Food!</h1>
                    </div>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="text"
                            placeholder="Buscar"
                            name="resto"
                            value={searchTerm}
                            onChange={handleChange}
                            onBlur={handleChange}
                        />
                        <button type="submit">
                            <BiSearchAlt2 size={22} />
                        </button>
                    </form>
                    {filter ? 
                        (<section className="home--list">                           
                            {
                                searchResult.map((item, key) => (
                                    <div key={key}>
                                        <Card 
                                            name={item.name}
                                            address={item.address}
                                            image={item.image}
                                            id={item.id}
                                            hours={item.hours}
                                        />
                                    </div>
                            ))}
                        </section> 
                        ) : (
                        <section className="home--list">
                            {
                                cards.map((item, key) => (
                                    <div key={key}>
                                            <Card 
                                                name={item.name}
                                                address={item.address}
                                                image={item.image}
                                                id={item.id}
                                                // hours={item.hours}
                                            />
                                    </div>
                            ))}
                        </section>
                    )} 
                </div>
            </main>
        </>
    )
}