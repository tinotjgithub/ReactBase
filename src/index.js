import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>, 
    document.getElementById('root'));

registerServiceWorker();
