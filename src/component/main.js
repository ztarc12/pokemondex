import './main.css'
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { typeNameMap, typeColorMap } from './pokemonType'
import { fetchAllPokemon } from '../services/api'
import { Link } from 'react-router-dom'

function Main({searchPokemon}){
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [displayPokemonData, setDisplayPokemonData] = useState([]);
  const [hasMore, setHasMore] = useState(true)
  const [filterPokemon, setFilterPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pokemonPerPage = 76
  const totalPokemon = 1025

  useEffect(() => {
    const loadAllPokemonData = async () => {
      const allData = await fetchAllPokemon(1, totalPokemon);
      setAllPokemonData(allData);
      setDisplayPokemonData(allData.slice(0, pokemonPerPage));
    };
    loadAllPokemonData();
  }, []);

  useEffect(() => {
    if (searchPokemon) {
      const lowerSearchTerm = searchPokemon.toLowerCase();
      const filteredData = allPokemonData.filter((pokemon) =>
        pokemon.korean_name.includes(lowerSearchTerm) || pokemon.name.toLowerCase().includes(lowerSearchTerm)
      );
      setFilterPokemon(filteredData);
      setHasMore(false)
    } else {
      setFilterPokemon(displayPokemonData);
      setHasMore(true)
    }
  }, [searchPokemon, allPokemonData, displayPokemonData]);

  const fetchMoreData = () => {
    const nextPageData = allPokemonData.slice(currentPage * pokemonPerPage, (currentPage + 1) * pokemonPerPage);
    setDisplayPokemonData((prevData) => [...prevData, ...nextPageData]);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  console.log(filterPokemon)
  console.log(searchPokemon)
  
  return(
    <div>
      <InfiniteScroll
        dataLength={filterPokemon.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>데이터 불러오는 중...</h4>}
        // endMessage={<h4>모든 데이터를 불러왔습니다!</h4>}
        className='text'
      >
        <ul className="pokemon-box">
          {filterPokemon.map((pokemon, i) => {
            // console.log(pokemon)
            return (
              <li key={i}>
                <Link to={`/pokemon/${pokemon.id}`}>
                  <div className='pokemonInfoBox' key={i}>
                    <img className='pokemonImg' src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div className='pokemonName'>
                      <p className='pokemonNo'>NO.{pokemon.id}</p>
                      <h3 className='pokemonTitle'>{pokemon.korean_name}</h3>
                    </div>
                  </div>
                  <div className="pokemonTypeBox"> 
                    {
                      pokemon.types.map((type, i)=>{
                        return(
                          <span className='pokemonType' style={{backgroundColor: typeColorMap[type.type.name]}}>{typeNameMap[type.type.name]}</span>
                        )
                      })
                    }
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default Main