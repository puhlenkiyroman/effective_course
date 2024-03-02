import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Comics from './components/Comics';
import Characters from './components/Characters';
import Layout from './components/Layout';
import './App.css';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/comics" element={<Comics />} />
                    <Route path="/characters" element={<Characters />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
