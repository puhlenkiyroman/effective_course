import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {HashRouter} from "react-router-dom";

// Localization
import i18n from './localization';

i18n.init();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter basename={'/effective_course'}>
            <App />
        </HashRouter>
    </React.StrictMode>
);