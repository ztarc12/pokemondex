import axios from "axios";

export const getPokemonByInfo = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return response.data
    // console.log(response)
    // console.log(response.data)
  } catch(error) {
    console.error(`데이터 가져오는 동안 오류가 있습니다. : ${id}`, error);
    return null;
  }
}

export const getPokemonSpecies = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    return response.data
    // console.log(response.data)
    // console.log(response)
  } catch (error) {
    console.error(`포켓몬 스펙을 가져오는데 오류가 있습니다.:${id}`, error)
    return null;
  }
}

export const fetchAllPokemon = async (startId, endId) => {
  const promise = []
  for (let i = startId; i<=endId; i++) {
    const pokemonPromise = getPokemonByInfo(i)
    const speciesPromise = getPokemonSpecies(i)
    promise.push(Promise.all([pokemonPromise, speciesPromise]))
  }
  try {
    const results = await Promise.all(promise)
    
    return results.map(([pokemonData, speciesData]) => {
      // console.log(speciesData)
      // console.log(speciesData.data)
      // console.log(pokemonData)
      // console.log(pokemonData.data)
      if (!pokemonData || !speciesData) return null;
      const koreanName = speciesData.names.find((name)=> name.language.name === 'ko')
      return {
        // ...pokemonData.data,
        id : pokemonData.id,
        name : pokemonData.name,
        korean_name : koreanName ? koreanName.name : pokemonData.name,
        sprites : pokemonData.sprites,
        types : pokemonData.types,
      }
    }).filter(Boolean)
  } catch (error) {
    console.error('모든 포켓몬 데이터를 가져오는데 오류가 있습니다.', error)
    return []
  }
}
export const getDetailedPokemon = async (id) => {
  try {
    const pokemonData = await getPokemonByInfo(id)
    const speciesData = await getPokemonSpecies(id)
    console.log(pokemonData)
    console.log(speciesData)

    const koreanName = speciesData.names.find((name)=> name.language.name === 'ko')
    // const flavorText = speciesData.flavor_text_entries.find((entry) => entry.language.name === 'ko')
    const flavorTextEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === 'ko'
    );
    const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : '추후 업데이트 예정입니다.';

    return {
      id : pokemonData.id,
      name : pokemonData.name,
      korean_name : koreanName ? koreanName.name : pokemonData.name,
      sprites : pokemonData.sprites.front_default,
      types : pokemonData.types,
      height : pokemonData.height,
      weight : pokemonData.weight,
      flavor_text : flavorText,
    }

  } catch (error) {
    console.error('포켓몬 데이터를 가져오는데 오류가 있습니다.', error)
    return [];
  }
}
// console.log(fetchAllPokemon())