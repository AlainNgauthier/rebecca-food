import React, { Fragment } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Home.css';

export default function Home() {


    return(
        <Fragment>
            <div className="home">
                <div className="home_wrap">
                    <div className="home-title">
                        <span>Bem-vindo ao Rebecca Food</span>
                    </div>
                    <form onSubmit={() => {}}>
                        <input 
                            type="text"
                            placeholder="Buscar estabelecimento"
                            
                            onChange={() => {}}
                        />
                        <button type="submit">
                            <BiSearchAlt2 size={20} />
                        </button>
                    </form>
                    <div className="home-list">
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
}