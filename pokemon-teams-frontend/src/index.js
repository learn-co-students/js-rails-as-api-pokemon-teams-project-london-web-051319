const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers(){
  return fetch(TRAINERS_URL).then(resp => resp.json())
}

function getTrainer(id){
  return fetch(`${TRAINERS_URL}/${id}`).then(resp => resp.json())
}

function getPokemons(){
  return fetch(POKEMONS_URL).then(resp => resp.json())
}

function getPokemon(id){
  return fetch(`${POKEMONS_URL}/${id}`).then(resp => resp.json())
}

function addPokemon(trainer_id){
  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
    body: JSON.stringify({trainer_id: trainer_id})
    }).then(resp => resp.json())
}

function deletePokemon(pokemon_id){
  return fetch(`${POKEMONS_URL}/${pokemon_id}`, {
    method: "DELETE"
    }).then(resp => resp.json())
}

function createTrainerCard(trainer){
  const div = document.createElement('div')
  div.className = "card"
  div.setAttribute('data-id', trainer.id)

  const p = document.createElement('p')
  p.textContent = trainer.name

  const button = document.createElement('button')
  button.setAttribute('data-trainer-id', trainer.id)
  button.textContent = "Add Pokemon"
  button.onclick = function(e) {appendPokemon(e.target.getAttribute('data-trainer-id'))}

  const ul = document.createElement('ul')

  for (pokemon of trainer.pokemon) {
    ul.appendChild(createPokemonListItem(pokemon))
  }

  div.append(p, button, ul)

  return div
}

function createPokemonListItem(pokemon){
  const li = document.createElement('li')
  li.textContent = `${pokemon.nickname} (${pokemon.species})`
  
  const button = document.createElement('button')
  button.className = "release"
  button.setAttribute('data-pokemon-id', pokemon.id)
  button.setAttribute('data-trainer-id', pokemon.id)
  button.textContent = 'Release'
  button.onclick = function(e) {releasePokemon(e.target.getAttribute('data-pokemon-id'))}

  li.appendChild(button)

  return li
}

function createTrainersCards(trainers){
  const main = document.querySelector('main')
  for (trainer of trainers) {
    main.appendChild(createTrainerCard(trainer));
  }
  return main
}

function releasePokemon(pokemon_id) {
  const li = document.querySelector(`button[data-pokemon-id='${pokemon_id}']`).parentNode
  const ul = li.parentNode
  deletePokemon(pokemon_id).then(ul.removeChild(li))
}

function appendPokemon(trainer_id) {
  const card = selectTrainerCard(trainer_id)
  const ul = card.querySelector('ul')

  
  if (ul.children.length < 6) {
    addPokemon(trainer_id)
      .then(pokemon => createPokemonListItem(pokemon))
      .then(li => ul.appendChild(li))
  } else {
    alert('Cannot add more than six pokemon.')
  }
}

function selectTrainerCard(trainer_id) {
  return document.querySelector(`div[data-id='${trainer_id}']`)
}

function addTrainersToMain() {
  getTrainers().then(trainers => createTrainersCards(trainers))
}

window.addEventListener('DOMContentLoaded', (e) => {
  addTrainersToMain();
});