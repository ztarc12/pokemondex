import './App.css';
import { usePokemonData } from './usePokemonData';
import { Header } from './component/header';
import Main from './component/main';
function App() {
  // const pokemonData = usePokemonData()

  // console.log(pokemonData)
  return (
    <div className="App">
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;