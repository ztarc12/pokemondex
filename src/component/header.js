import { Link } from "react-router-dom";
import './header.css'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
        <img src={process.env.PUBLIC_URL + '/icon_ball.png'}></img>
        <input type="text" value={searchPokemon} onChange={searchChange} className="searchBox" placeholder="포켓몬 이름을 입력해주세요"></input>
        <button type="submit">
          <FontAwesomeIcon icon={faBars} className="icon"/>
        </button>
      </form>
    </header>
  )
}
