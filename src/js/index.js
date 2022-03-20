function getPokemon(id) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const data = fetch(apiUrl).then((response) => response.json());
  return data;
}
function getPokemons() {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const data = fetch(apiUrl).then((response) => response.json());
  return data;
}

function getGeneration(id) {
  const apiUrl = `https://pokeapi.co/api/v2/generation/${id}`;
  const data = fetch(apiUrl).then((response) => response.json());
  return data;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let listOfPokemon = [];
getPokemons().then((data) => {
  data.results.forEach((pokemon) => {
    listOfPokemon.push(pokemon.name);
  });
});

function populatePokemonFromAPI(id) {
  const imageControl = document.getElementById("pokemonImg");
  const nameControl = document.getElementById("nameInfo");
  const pokedexNumberControl = document.getElementById("numInfo");
  const genControl = document.getElementById("genInfo");
  const typesContainer1 = document.getElementById("typeInfo1");
  const typesContainer2 = document.getElementById("typeInfo2");
  const abilitiesContainer1 = document.getElementById("pokemonData1");
  const abilitiesContainer2 = document.getElementById("pokemonData2");
  const xpControl = document.getElementById("xpInfo");
  const heightControl = document.getElementById("heightInfo");
  const weightControl = document.getElementById("weightInfo");

  getPokemon(id).then((pokemon) => {
    // Image
    imageControl.src = pokemon.sprites.front_default;
    // Name
    setTextChild(nameControl, capitalize(pokemon.name));
    // Pokedex number
    setTextChild(pokedexNumberControl, pokemon.order + "#" ?? "#");
    // Generation
    getGeneration(1).then((gen) => {
      const generationText = `${gen.id} - ${gen.main_region.name}`;
      setTextChild(genControl, generationText ?? "#");
    });
    // Types
    setTextChild(typesContainer1, pokemon.types[0].type.name, "typeInfo1");
    setTextChild(typesContainer2, pokemon.types[1].type.name, "typeInfo2");
    // Abilities
    setTextChild(
      abilitiesContainer1,
      pokemon.abilities[0].ability.name,
      "pokemonData1"
    );
    setTextChild(
      abilitiesContainer2,
      pokemon.abilities[1].ability.name,
      "pokemonData2"
    );
    // XP
    setTextChild(xpControl, pokemon.base_experience);
    // Height
    setTextChild(heightControl, pokemon.height);
    // Weight
    setTextChild(weightControl, pokemon.weight);
  });
}

function populatePokemonFromData(pokemon) {
  const imageControl = document.getElementById("pokemonImg");
  const nameControl = document.getElementById("nameInfo");
  const pokedexNumberControl = document.getElementById("numInfo");
  const genControl = document.getElementById("genInfo");
  const typesContainer1 = document.getElementById("typeInfo1");
  const typesContainer2 = document.getElementById("typeInfo2");
  const abilitiesContainer1 = document.getElementById("pokemonData1");
  const abilitiesContainer2 = document.getElementById("pokemonData2");
  const xpControl = document.getElementById("xpInfo");
  const heightControl = document.getElementById("heightInfo");
  const weightControl = document.getElementById("weightInfo");

  // Image
  imageControl.src = pokemon.sprites.front_default;
  // Name
  setTextChild(nameControl, capitalize(pokemon.name));
  // Pokedex number
  setTextChild(pokedexNumberControl, pokemon.order + "#" ?? "#");
  // Generation
  getGeneration(1).then((gen) => {
    const generationText = `${gen.id} - ${gen.main_region.name}`;
    setTextChild(genControl, generationText ?? "#");
  });
  // Types
  setTextChild(typesContainer1, pokemon.types[0].type.name, "typeInfo1");
  setTextChild(typesContainer2, pokemon.types[1].type.name, "typeInfo2");
  // Abilities
  setTextChild(
    abilitiesContainer1,
    pokemon.abilities[0].ability.name,
    "pokemonData1"
  );
  setTextChild(
    abilitiesContainer2,
    pokemon.abilities[1].ability.name,
    "pokemonData2"
  );
  // XP
  setTextChild(xpControl, pokemon.base_experience);
  // Height
  setTextChild(heightControl, pokemon.height);
  // Weight
  setTextChild(weightControl, pokemon.weight);
}

function setTextChild(parentComponent, text, replace = true) {
  const textNode = document.createTextNode(text);
  // Remove children if children exist
  if (replace && parentComponent.hasChildNodes()) {
    deleteChildren(parentComponent);
  }
  // Add text
  parentComponent.appendChild(textNode);
}

function deleteChildren(parentComponent) {
  while (parentComponent.firstChild) {
    parentComponent.removeChild(parentComponent.firstChild);
  }
}

function setButtonsBehavior() {
  // Previous button
  const prevButton = document.getElementById("btnPrev");
  prevButton.addEventListener("click", prevPokemon);
  // Next button
  const nextButton = document.getElementById("btnNext");
  nextButton.addEventListener("click", nextPokemon);
  // Search button
  const searchButton = document.getElementById("searchBtn");
  searchButton.addEventListener("click", searchPokemon);
}

function nextPokemon() {
  if (currentPokemonId <= 151) {
    populatePokemonFromAPI(++currentPokemonId);
    0;
  }
}

function prevPokemon() {
  if (currentPokemonId > 1) {
    populatePokemonFromAPI(--currentPokemonId);
  }
}

//Pendiente de hacer
function searchPokemon() {
  const searchInput = document.getElementById("searchTxt");
  const searchValue = searchInput.value;
  const searchResult = listOfPokemon.filter((pokemon) => {
    return pokemon.includes(searchValue.toLowerCase());
  });
  if (searchResult.length > 0) {
    populatePokemonFromAPI(searchResult[0]);
  } else {
    alert("There is no pokemon with that name");
  }
}

let currentPokemonId = 1;
setButtonsBehavior();
populatePokemonFromAPI(currentPokemonId);
