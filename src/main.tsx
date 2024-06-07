import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

// Localization
import i18n from './localization';

i18n.init();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename={'/effective_course'}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);