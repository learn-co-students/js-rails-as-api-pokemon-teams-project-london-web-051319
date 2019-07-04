const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;



function init() {
  fetchTrainers();
}

function fetchTrainers() {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(allTrainers => showPokemonTeam(allTrainers));
}

function showPokemonTeam(allTrainers) {
  allTrainers.forEach(trainer => {
    addPokemonTeam(trainer);
  });
}

function addPokemonTeam(trainer) {

  const pokemonTeamList = document.querySelector("main");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const button = document.createElement("button");

  button.setAttribute("data-trainer-id", trainer.id);
  button.innerText = "Add Pokemon";

  p.innerText = trainer.name;
  div.appendChild(button);
  div.appendChild(p);
  addPokemonToTeam(trainer, div);
  button.addEventListener("click", e => addNewPokemon(e, trainer));
  pokemonTeamList.appendChild(div);
}

function addNewPokemon(e, trainer) {
  let trainerID = e.target.getAttribute("data-trainer-id");
  let div = e.path[1];
  createPokemon(trainer.id, div);

}

function createPokemon(trainerID, div) {
  fetch(`${POKEMONS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        trainer: trainerID
      }),
    }).then(response => response.json())
    .then(pokemon => renderNewPokemon(pokemon, div));
}


function addPokemonToTeam(trainer, div) {
  fetch(POKEMONS_URL)
    .then(resp => resp.json())
    .then(allPokemon => filterPokemonByTrainer(allPokemon, trainer))
    .then(allFilteredPokemon => forEachPokemonRender(allFilteredPokemon, div));
}

function forEachPokemonRender(allFilteredPokemon, div) {
  allFilteredPokemon.forEach(pokemon => renderNewPokemon(pokemon, div))
}

function renderNewPokemon(pokemon, div) {
  const li = document.createElement("li");
  li.innerText = pokemon.species;
  li.innerText += ` (${pokemon.nickname})`;

  const button = document.createElement("button");
  button.className = "release";
  button.setAttribute("data-pokemon-id", pokemon.id);
  button.innerText = "Release";

  const ul = document.createElement("ul");

  li.appendChild(button);
  ul.appendChild(li);
  div.appendChild(ul);

  button.addEventListener("click", e => releasePokemon(e, pokemon, ul, div));
}

function filterPokemonByTrainer(allPokemon, trainer) {
  allFilteredPokemon = allPokemon.filter(pokemon => pokemon.trainer_id === trainer.id);
  return allFilteredPokemon;
}

function releasePokemon(e, pokemon, ul, div) {
  return fetch(`${POKEMONS_URL}/${pokemon.id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(div.removeChild(ul));
}


init();