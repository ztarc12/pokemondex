import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPokemonSpecies, getDetailedPokemon } from "../services/api"
import { typeNameMap, typeColorMap } from "./pokemonType"
import './detailPokemon.css'

function DetailPokemon(){
  const {id} = useParams()
  const [pokemonData, setPokemonData] = useState(null)
  const navigate = useNavigate()
  const firstPokemon = 1
  const lastPokemon = 1025

  useEffect(()=>{
    const fetchPokemonDetail = async () => {
      const data = await getDetailedPokemon(id)
      // const species = await getPokemonSpecies(id)
      setPokemonData(data)
      console.log(data)
    }
    fetchPokemonDetail()
  }, [id])

  // console.log(JSON.stringify(pokemonData))

  if(!pokemonData) return <h4>불러오는 중입니다.</h4>

  // const types = pokemonData.types
  // .map((typeInfo) => typeNameMap[typeInfo.type.name] || typeInfo.type.name)
  // .join(', ');
  const prevPokemon = () => {
    const prevId = parseInt(id) - 1;
    navigate(`/pokemon/${prevId}`)
    if(prevId < firstPokemon) {
      navigate(`/pokemon/${lastPokemon}`)
    } else {
      navigate(`/pokemon/${prevId}`)
    }
  }
  const nextPokemon = () => {
    const nextId = parseInt(id) + 1;
    if(nextId > lastPokemon) {
      navigate(`/pokemon/${firstPokemon}`)
    } else {
      navigate(`/pokemon/${nextId}`)
    }
  }

  return(
    <div className="detailPokemonBox">
      <div className="btn-box">
        <button onClick={prevPokemon}>이전 포켓몬</button>
        <button onClick={nextPokemon}>다음 포켓몬</button>
      </div>
      <img src={pokemonData.sprites} alt={pokemonData.korean_name}></img>
      <h2>{pokemonData.korean_name}</h2>
      <p>{pokemonData.flavor_text}</p>
      <div className="detailPokemonBoxGrid">
        <p>키 : {pokemonData.height / 10}m</p>
        <p>몸무게 : {pokemonData.weight / 10}kg</p>
        {/* <p >타입 : {types}</p> */}
        <div className="typeBox">
          <p>타입 : {pokemonData.types.map((typeInfo, index) => {
            const typeName = typeInfo.type.name;
            return (
              <span key={index} style={{backgroundColor: typeColorMap[typeName] || "#ddd",}}>
                {typeNameMap[typeName] || typeName}
              </span>
            );
          })}</p>
          
        </div>
      </div>
    </div>
  )
}

export default DetailPokemon