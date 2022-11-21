const pokemon_conteiner = document.querySelector('#poke-conteiner');

const pokemon_count = 151;

const colors = {
  fire: '#f59aa2',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#f5b7f7',
  poison: '#b8abd1',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#f5a6f7',
  flying: '#c7e2f0',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for(let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
}

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  creatPokemonCard(data);
}

const creatPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');
  
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const id = pokemon.id.toString().padStart(3,'0');

  const pokemons_types = pokemon.types.map(typeInfo => typeInfo.type.name);
  //console.log(pokemons_types, id);
  // const type = main_types.find(type => pokemons_types.indexOf(type) > -1);

  
  console.log(pokemons_types[1]);

  if(pokemons_types[1]){
    const color = colors[pokemons_types[0]];
    const color2 = colors[pokemons_types[1]];
    pokemonEl.style.background = "linear-gradient(140deg, "+ color + ", "+ color2 +")";
  }
  else{
    const color = colors[pokemons_types[0]];
    pokemonEl.style.backgroundColor = color;
  }

  const img = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;
  const pokemonInnerHTML = `
  
  <div class="img-conteiner">
    <img src="${img}">
  </div>
  <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${pokemons_types.join(', ')}</span></small>
  </div>
  `;

  pokemonEl.innerHTML = pokemonInnerHTML;
  pokemon_conteiner.appendChild(pokemonEl);
}

fetchPokemons()