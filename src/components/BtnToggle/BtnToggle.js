import React, {useContext} from 'react';
import './BtnToggle.css';
import { ThemeContext } from '../../Context/ThemeContext';

function BtnToggle() {
    
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <button
         onClick={toggleTheme}
         className={theme ? "btn dark--btn" : "btn"}
        >
            {theme ? 'Light Mode' : 'Dark Mode'}
        </button>
    )
}

export default BtnToggle
