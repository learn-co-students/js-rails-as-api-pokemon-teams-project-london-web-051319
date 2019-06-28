const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainersPokemon() {
  fetch(TRAINERS_URL)
    .then(trainers => trainers.json())
    .then(trainers => {
      trainers['data'].forEach(trainer => printTrainersPokemon(trainer));
    });
}

function printTrainersPokemon(trainer_json) {
  // create dom elements
  const card = document.createElement('div');
  const p = document.createElement('p');
  const add_btn = document.createElement('button');
  const ul = document.createElement('ul');
  const main = document.querySelector('main');
  const pokemons = trainer_json['attributes']['pokemons'];

  // adding attrs to elements
  card.setAttribute('class', 'card');
  card.setAttribute('data-id', trainer_json['id']);
  add_btn.setAttribute('class', 'add__pokemon');
  add_btn.setAttribute('data-id', trainer_json['id']);

  // adding inner text
  p.textContent = trainer_json['attributes']['name'];
  add_btn.textContent = 'Add Pokemon';
  add_btn.addEventListener('click', e => addPokemon(e));

  card.append(p, add_btn);

  pokemons.forEach(pokemon => {
    printPokemon(pokemon, ul);
  });

  card.appendChild(ul);
  main.append(card);
}

function printPokemon(pokemon_obj, ul) {
  //create dom elements
  const li = document.createElement('li');
  const remove_btn = document.createElement('button');

  // add attributes to elements
  remove_btn.setAttribute('class', 'release');
  remove_btn.setAttribute('data-pokemon-id', pokemon_obj['id']);
  remove_btn.addEventListener('click', e => releasePokemon(e));

  li.textContent = `${pokemon_obj['nickname']} (${pokemon_obj['species']})`;
  remove_btn.textContent = 'Release';

  li.appendChild(remove_btn);
  ul.appendChild(li);
}

/*
  when user clicks add pokemon
  add pokemon if trainer has less than 4 pokemon
*/

function addPokemon(e) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "trainer_id": e.target.getAttribute('data-id')
    })
  };


  const ul = e.target.parentElement.childNodes[2];

  fetch(TRAINERS_URL, options)
    .then(pokemon => pokemon.json())
    .then(pokemon => {
      printPokemon(pokemon, ul);
    });
}

function releasePokemon(e) {
  // get the id
  // remove self
  // send delete request to dataBase
  let id = e.target.getAttribute('data-pokemon-id')
  e.target.parentNode.style.display = 'none';

  releasePokemonFromDb(id)
}

function releasePokemonFromDb(id) {
  const options = {
    method: 'DELETE',
    body: JSON.stringify({
      id: id
    })
  };

  fetch(`${BASE_URL}/pokemons/${id}`, options)
    .then(pokemon => pokemon.json())
    .then(pokemon => console.log(pokemon));
}

getTrainersPokemon();
