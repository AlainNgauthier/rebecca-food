import React from 'react';
import './Loader.css';

const Loader = () => {
    return(
        <div className="loader">
            <svg width="200" height="200" className="svg">
                <circle cx={100} cy={100} r={95} />
            </svg>
        </div>)
}

export default Loader;