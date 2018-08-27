import React, {Component} from 'react';
import App from './App';
import {Home} from './Home';
import { Route, Switch } from 'react-router-dom';
import {NotFound} from './NotFound'

export default class AppRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path = "/" component =  {App}/>
                    <Route path = "/home" component = {Home} />
                    <Route component = {NotFound} />
                </Switch>
            </div>
        );
    }
}

