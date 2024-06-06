import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Comics from './routes/Comics';
import ComicsDetails from "./routes/Comics/ComicsDetails";
import Characters from './routes/Characters';
import CharacterDetails from './routes/Characters/CharacterDetails';
import Favourites from "./routes/Favourites";
import Layout from './components/Layout';
import PushNotification from './index.tsx';
import './App.css';
function App() {
    return (
        <Router>
            <PushNotification />
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}
                    className={(match, location) => (location.pathname === '/' || location.pathname === '/characters') ? 'active' : ''}
                >
                    <Route index element={<Characters />} /> {/*чтобы пока что на главной странице были characters*/}
                    <Route path="/comics" element={<Comics />} />
                    <Route path="/comics/:id" element={ <ComicsDetails />} />
                    <Route path="/characters" element={<Characters />} />
                    <Route path="/characters/:id" element={<CharacterDetails />} />
                    <Route path="/favourites" element={<Favourites />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
