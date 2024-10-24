// export const 

// import axios from "axios";
// import { useEffect, useState, useCallback } from "react";

// export function usePokemonData() {
//   const [pokemonData, setPokemonData] = useState([]);
//   const [offset,setOffset] = useState(0)
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 확인하는 상태

//   const fetchPokemonData = useCallback(async () => {
//     if (isLoading || !hasMore) return; // 로딩 중이거나 더 이상 데이터가 없으면 실행하지 않음
//     setIsLoading(true);
    
//     try {
//       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${0}`);
//       const pokemonResults = response.data.results;

//       if (pokemonResults.length === 0) {
//         setHasMore(false); // 더 이상 불러올 데이터가 없을 때 처리
//         return;
//       }

//       // 포켓몬 상세 정보 가져오기
//       const detailPokemon = pokemonResults.map((pokemon) => axios.get(pokemon.url));
//       const detailPokemonResponse = await Promise.all(detailPokemon);
//       console.log(detailPokemonResponse)

//       const pokemonSpecData = detailPokemonResponse.map((res) => ({
//         id: res.data.id,
//         name: res.data.name,
//         img: res.data.sprites.front_default,
//         type: res.data.types.map((typeInfo) => typeInfo.type.name),
//       }));

//       setPokemonData((prevData) => [...prevData, ...pokemonSpecData]);
//       setOffset((prevOffset) =>{
//         const newOffset = prevOffset + 20
//         console.log(`new offset set to : ${newOffset}`)
//         return newOffset
//       });
//       if (pokemonResults.length === 0) {
//         setHasMore(false);
//       }

//     } catch (error) {
//       console.error("Error fetching pokemon data", error);
//     } finally {
//       setIsLoading(false); // 로딩 끝
//     }
//   }, [isLoading, hasMore, offset]); // 의존성 배열에 offset 추가

//   useEffect(() => {
//     fetchPokemonData();
//   }, [fetchPokemonData]); // fetchPokemonData가 업데이트될 때마다 실행

//   return { pokemonData, fetchPokemonData, hasMore };
// }
