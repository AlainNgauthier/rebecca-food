import React, { Fragment } from 'react';
import './Header.css';
import Btn from '../BtnToggle/BtnToggle';
import ThemeContext from '../../Context/ThemeContext';

export default function Header() {
    return(
        <Fragment>
            <div className="header">
                <Btn/>
            </div>
        </Fragment>
    )
}