
import store from "./app/store";
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./index.css"
import "./flag.css"
import "primereact/resources/primereact.css"
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/lara-light-blue/theme.css"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
