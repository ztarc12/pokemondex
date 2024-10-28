import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './component/header';
import Main from './component/main';
import { useState } from 'react';
import DetailPokemon from './component/DetailPokemon';

function App() {
  const [searchPokemon, setSearchPokemon] = useState('')

  const search = (pokemon) =>{
    setSearchPokemon(pokemon)
  }
  return (
    <div className="App">
      <Header onSearch={search}></Header>
      <Routes>
        <Route path='/' element={<Main searchPokemon={searchPokemon}/>}></Route>
        <Route path='/pokemondex' element={<Main searchPokemon={searchPokemon}/>}></Route>
        <Route path='/pokemon/:id' element={<DetailPokemon/>}></Route>
      </Routes>
    </div>
  );
}

export default App;