import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Pokedex } from "./components/Pokedex";
import { PokeDetail } from "./components/PokeDetail";
import { PokeProvider, usePokeData } from "./utils/pokeData";

function App() {
  const pokeData = usePokeData();
  console.log("foundPoke", pokeData);
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
