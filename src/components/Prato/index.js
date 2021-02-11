import React from 'react';
import './Prato.css';

export default function Prato(props) {



    return(
            <div className="card-prato">
                <div className="card-prato__img">
                    <img src={props.imagem} alt="img-prato"/>
                </div>
                <div className="card-prato__description">
                    <span className="prato--nome">{props.nome}</span>
                    <span className="prato--description"> Lorem ipsum dolor sit amet, consectetur... </span>
                    <span className="prato-categoria">Categoria: <strong>{props.categoria}</strong></span>
                    <span className="prato--preco">R$ {props.preco}</span>
                </div>
            </div>
    )      
}