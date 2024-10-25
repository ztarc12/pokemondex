import './App.css';
import { Header } from './component/header';
import Main from './component/main';
import { useState } from 'react';
function App() {
  const [searchPokemon, setSearchPokemon] = useState('')

  const search = (pokemon) =>{
    setSearchPokemon(pokemon)
  }
  return (
    <div className="App">
      <Header onSearch={search}></Header>
      <Main searchPokemon={searchPokemon}></Main>
    </div>
  );
}

export default App;