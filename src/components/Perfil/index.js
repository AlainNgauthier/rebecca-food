import React, { useState, useEffect, useCallback } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Perfil.css';
import Loader from '../Loader';
import api from '../Services/api';

import Prato from '../Prato/index';

export default function Perfil(props) {
    
    const [load, setLoad] = useState(true);
    const [perfil, setPerfil] = useState([]); //array menus
    const [searchMenu, setSearchMenu] = useState('');
    const [searchResultado, setSearchResultado] = useState([]);
    const [filtro, setFiltro] = useState(false);

    const handleChangeMenu = event => {
        setSearchMenu(event.target.value);
    }

    useEffect(() => {

        async function loading() {
            const idRestaurante = props.match.params.id;
            //console.log(idRestaurante);
            const responseID = await api.get(`/restaurants/${idRestaurante}/menu`);
            
            // console.log(responseID.data[0]);            
            // console.log(responseID.data[0].sales[0].description);
            setPerfil(responseID.data);
            //console.log(perfil);
            setLoad(false);
        }

        loading();

    }, [])
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        
        

        const resultado = perfil.filter(menu => menu.name.toLowerCase().includes(searchMenu.toLowerCase()));
        
        if(resultado) {
            setFiltro(true);
            setSearchResultado(resultado);
        }
        if(!resultado) {
            //setFiltro(false);
        }
    }, [perfil, searchMenu]);
    
    
    if(load) {
        return(
          <div className="perfil__loading">
            <Loader />
          </div>
        )
      }
    
    return(
        <div className="content">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Buscar no cardápio"
                    //value      
                    onChange={handleChangeMenu}
                    />
                <button type="submit">
                    <BiSearchAlt2 size={22} />
                </button>
            </form>
            {filtro ? 
                <div className="content__wrap">   
                    {searchResultado.map((item, key) => (
                        <div key={key}>
                            <Prato nome={item.name} 
                                    // description={item[0].sales.description} 
                                    preco={item.price} 
                                    imagem={item.image}
                                    categoria={item.group}
                            />
                            {/* {console.log(searchResultado[0].sales)} */}
                        </div>
                    ))} 
                 </div> :
                <div className="content__wrap">   
                    {perfil.map((item, index) => (
                        <div key={index}>
                            <Prato nome={item.name} 
                                    // description={item.sales.description} 
                                    preco={item.price} 
                                    imagem={item.image}
                                    categoria={item.group}
                            />
                        </div>
                    ))}
                </div>
            }
        </div>
    
    )
}

