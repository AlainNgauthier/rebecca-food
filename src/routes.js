import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Perfil from './components/Perfil';

export default function Routes() {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/perfil/:id" component={Perfil} />
            </Switch>
        </BrowserRouter>
    )
}