import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Comics from './components/Comics';
import ComicsDetails from "./components/Comics/ComicsDetails.tsx";
import Characters from './components/Characters';
import CharacterDetails from './components/Characters/CharacterDetails.tsx';
import Layout from './components/Layout';
import './App.css';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/comics" element={<Comics />} />
                    <Route path="/comics/:id" element={ <ComicsDetails />} />
                    <Route path="/characters" element={<Characters />} />
                    <Route path="/characters/:id" element={<CharacterDetails />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
