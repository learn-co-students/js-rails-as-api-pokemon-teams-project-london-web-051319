const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



document.addEventListener('DOMContentLoaded', function() {
    getAllTrainers()
  })

function getAllTrainers() {
    return fetch(TRAINERS_URL)
    .then(trainerData => trainerData.json())
    .then(trainerArray => showTrainers(trainerArray));
}

function showTrainers(trainerArray) {
    trainerArray.map(trainer => {addTrainer(trainer);
    });
}
  
function addTrainer(trainer) {
    const trainer_list = document.querySelector('main');
    const div = makeTrainer(trainer);
    trainer_list.appendChild(div);
}

function makeTrainer(trainer) {
    const div = document.createElement("div");
    div.className = "card";

    const p = document.createElement("p");
    p.textContent = trainer.name;

    const createButton = document.createElement("button");
    createButton.setAttribute('data-trainer-id', `${trainer.id}`)
    createButton.innerText = "Add Pokemon"
    createButton.addEventListener("click", e => handlePokemonCreation(e));
    
    const pokemonList = document.createElement("ul")

    for (const pokemon of trainer.pokemons) {
        const newPokemon = addPokemonToTeam(pokemon)
        pokemonList.appendChild(newPokemon)
      }

    div.appendChild(p);
    div.appendChild(createButton);
    div.appendChild(pokemonList);

    return div;
}

function addPokemonToTeam(pokemon) {
    const listEntry = document.createElement("li");
    listEntry.innerText = `${pokemon.nickname} (${pokemon.species})`
    
    const releaseButton = document.createElement("button");
    releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
    releaseButton.className = 'release'
    releaseButton.innerText = 'Release'
    releaseButton.addEventListener("click", e => releasePokemon(e));
    listEntry.appendChild(releaseButton)
    return listEntry
}

function releasePokemon(e){
    let pokemonID = e.target.getAttribute("data-pokemon-id")
    e.path[1].remove()
    return fetch(`${POKEMONS_URL}/${pokemonID}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        }
    });
}

function handlePokemonCreation(e){
    let trainerID = e.target.getAttribute("data-trainer-id")
    let card = e.path[1]
    createPokemon(trainerID,card)
}

function createPokemon(trainerID,card) {
    fetch(`${POKEMONS_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify({trainer: trainerID}),
    }).then(response => response.json())
    .then(pokemon => renderCard(pokemon, card))
}

function renderCard(pokemon, card){
    if (pokemon["error"]){
        alert(pokemon["error"])
    } else {
        pokemonList = card.querySelector("ul")
        const newPokemon = addPokemonToTeam(pokemon)
        pokemonList.appendChild(newPokemon)
}}
