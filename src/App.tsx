import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Comics from './routes/Comics';
import ComicsDetails from "./routes/Comics/ComicsDetails.tsx";
import Characters from './routes/Characters';
import CharacterDetails from './routes/Characters/CharacterDetails.tsx';
import Layout from './components/Layout';
import './App.css';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Characters />} /> {/*чтобы пока что на главной странице были characters*/}
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
