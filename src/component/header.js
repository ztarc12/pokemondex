import { Link } from "react-router-dom";
import './header.css'
import { useState } from "react";

export function Header({ onSearch }){
  const [searchPokemon, setSearchPokemon] = useState('')

  const searchChange = (e) => {
    setSearchPokemon(e.target.value)
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    if(onSearch) {
      onSearch(searchPokemon)
    }
  }

  console.log(searchPokemon)

  return(
    <header>
      <h2 className="mainLogo">
        <Link to={'/'}>
          <img className="logoImg" src={process.env.PUBLIC_URL + '/pokemon_logo.png'}></img>
        </Link>
      </h2>

      <form className="searchForm" onSubmit={searchSubmit}>
        <input type="text" value={searchPokemon} onChange={searchChange} className="searchBox" placeholder="어떤 포켓몬이 궁금한가요?"></input>
        <button type="submit">검색</button>
      </form>
    </header>
  )
}
