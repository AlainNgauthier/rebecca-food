import React, { useState, useEffect } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Perfil.css';
import api from '../Services/api';

import Prato from '../Prato/index';

export default function Perfil(props) {
    
    const [load, setLoad] = useState(true);
    const [perfil, setPerfil] = useState([]);

    useEffect(() => {

        async function loading() {
            const idRestaurante = props.match.params.id;
            //console.log(idRestaurante);
            const responseID = await api.get(`/restaurants/${idRestaurante}/menu`);
            console.log(responseID);
            //console.log(responseID.data);
            
            setPerfil(responseID.data);
            console.log(perfil);
            
            //
            setLoad(false);

        }

        loading();

    }, [])
    
    if(load) {
        return(
          <div className="perfil__loading">
            Carregando
          </div>
        )
      }
    
    return(
        <div className="content">
            <form onSubmit={() => {}}>
                <input 
                    type="text"
                    placeholder="Buscar no cardápio"
                    //value      
                    onChange={() => {}}
                    />
                <button type="submit">
                    <BiSearchAlt2 size={22} />
                </button>
            </form>
            <div className="content__wrap">   
                {perfil.map((item, key) => (
                    <div key={key}>
                        <Prato nome={item.name} 
                                //description={item.sales.description} 
                                preco={item.price} 
                                imagem={item.image}
                                categoria={item.group}
                        />
                    </div>
                ))}
            </div>
        </div>
    
    )
}

