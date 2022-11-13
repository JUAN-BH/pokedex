import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Pokedex } from "./components/Pokedex";
import { PokeDetail } from "./components/PokeDetail";
import { PokeProvider } from "./utils/pokeData";

function App() {
  return (
    <HashRouter>
      <PokeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path={`/detail`} element={<PokeDetail />} />
        </Routes>
      </PokeProvider>
    </HashRouter>
  );
}

export default App;
