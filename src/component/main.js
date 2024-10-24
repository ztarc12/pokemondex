import './main.css'
import { useEffect, useState } from "react"
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component"
import { typeNameMap, typeColorMap } from './pokemonType'

function Main(){
  const [pokemonData, setPokemonData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pokemonPerPage = 76
  const totalPokemon = 10000

  useEffect(()=>{
    const fetchPokemonData = async () => {
      const allPokemonData = []
      const start = (currentPage - 1) * pokemonPerPage + 1
      const end = Math.min(currentPage * pokemonPerPage, totalPokemon)

      const promise = []
      for (let i = start; i<=end; i++) {
        const pokemonPromise = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const speciesPromise = axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
        promise.push(Promise.all([pokemonPromise, speciesPromise]))
      }
      const results = await Promise.all(promise)
      console.log(results)

      const fetchedPokemonData = results.map(([pokemonResponse, speciesResponse]) => {
        const koreanName = speciesResponse.data.names.find((name)=> name.language.name === 'ko')
        return {
          ...pokemonResponse.data,
          korean_name : koreanName ? koreanName.name : pokemonResponse.data.name
        }
      })
      setPokemonData((prevData) => [...prevData, ...fetchedPokemonData])
    }
    fetchPokemonData()
  },[currentPage])

  const fetchMoreData = () => {
    setCurrentPage((prevPage)=> prevPage + 1)
  }
  console.log(pokemonData)
  return(
    <div>
      <h3>포켓몬 리스트</h3>
      <InfiniteScroll
        dataLength={pokemonData.length} // 현재까지 로드된 데이터 수
        next={fetchMoreData} // 데이터를 추가로 요청하는 함수
        hasMore={pokemonData.length < totalPokemon} // 모든 데이터를 불러왔는지 여부
        loader={<h4>데이터 불러오는 중...</h4>}
        endMessage={<h4>모든 데이터를 불러왔습니다!</h4>}
      >
        <ul className="pokemon-box">
          {pokemonData.map((pokemon, i) => (
            <li key={i}>
              <div className='pokemonInfoBox'>
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
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default Main