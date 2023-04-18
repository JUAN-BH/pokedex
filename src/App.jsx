import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { InitialStateContextProvider } from './context/initalStateContext';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import Header from './containers/Header';
import VideoBackground from './components/VideoBackground';
import './styles/main.scss';

function App() {
  return (
    <HashRouter>
      <InitialStateContextProvider>
        <Header />
        <VideoBackground />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:poke" element={<PokemonDetail />} />
        </Routes>
      </InitialStateContextProvider>
    </HashRouter>
  );
}

/*
 <Route path="*" element={<h1>Page Not Found</h1>} />
 <Route path="/detail/:slug" element={<PokeDetailAuth />} /> 
 */
export default App;
