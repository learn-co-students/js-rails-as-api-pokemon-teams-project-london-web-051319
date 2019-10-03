const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// document.addEventListener('DOMContentLoaded', (e) => {init();});

document.addEventListener('DOMContentLoaded', function(e) {
   console.log('DOM Content Successfully Loaded')
   init();
});

const init = () => {
   getData();
};

const getData = () => {

   fetch(TRAINERS_URL)
      .then(data => data.json())
      .then(jsonData => renderCards(jsonData))
      .catch(function(errors) {
      console.log(errors);
   });
};

const renderCards = (jsonData) => {
   let allDivs = document.querySelectorAll('div.card');
   for(let element of allDivs) {
	element.remove()
   }
   const trainerData = jsonData.data;
   const page = document.querySelector('main');
   let pokeData = jsonData.included;
   for(const element of trainerData) {
      let newDiv = document.createElement('div');
      newDiv.className = 'card';

      // TITLE & ADD BUTTON
      let newHeaderDiv = document.createElement('div');
      newHeaderDiv.className = 'title-box';
      let newH3 = document.createElement('h3');
      newH3.innerText = element.attributes.name;
      let addButton = document.createElement('button');
      addButton.id = element.attributes.name;
      addButton.className = 'add';
      addButton.innerText = 'Poké!';
      addButton.onclick = function(event){createPokemon(event)};
      newHeaderDiv.append(newH3, addButton);

      // LIST
      let newInnerDiv = document.createElement('div');
      newInnerDiv.className = 'inner-card';
      let newList = document.createElement('ul');
      let pokeData = element.attributes.pokemons;
      for(let e of pokeData) {
         let newLi = document.createElement('li');
         newLi.innerText = `Name: ${e.nickname};  Species: ${e.species}`;
         let newButton = document.createElement('button');
         newButton.id = e.id;
         newButton.innerText = 'R';
         newButton.onclick = function(event){release(event);};
         newLi.prepend(newButton);
         newList.append(newLi);
      }
      newInnerDiv.append(newList);
      newDiv.append(newHeaderDiv, newInnerDiv);
      page.append(newDiv);
   };
};

const release = (event) => {
   let num;
   num = event.target.id;
   let element = document.getElementById(`${num}`).parentElement;
   element.remove();

   fetch(`${POKEMONS_URL}/${num}`, {
      method: 'DELETE',
      headers: {
         // 'Content-Type': 'application/json', //not sending anything
         'Accept': 'text/plain' //accepting from the server this case my ruby code
      }
   })
   .then(console.log)

// POTENTIAL UPDATE METHOD
   // configOpt = {
   //    method: 'PATCH', // Might need to create another user (unclassified) as reference/foreign keys can't be blank
   //    headers: {
         // 'Content-Type': 'application/json',
         // 'Accept': 'application/json',
   //    },
   //    body: JSON.stringify({trainer_id: ""}),
   // };
   //
   // fetch(`${POKEMONS_URL}/${num}`, configOpt)
   //    .then(data => data.json())
   //    .then(console.log)
   //    .catch(function(error) {
   //       console.log(error);
   //    });
};

const createPokemon = (event) => {
   // Now add code here to execute adding a pokemon to the right person.
   let trainerName = event.target.id

   fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({trainer: trainerName})
   })
   .then(data => data.json())
   // .then(console.log)
   .then(function(data) {
      addPokemonToTeam(data)
   })
};

const addPokemonToTeam = (data) => {
   // trainerName = data.data.attributes.trainer.name;
   // let pokemonData = data.data.attributes;
   // let teamCard = document.querySelector(`#${trainerName}`).parentElement.parentElement;
   // let teamList = teamCard.lastElementChild;
   // newLi = document.createElement('li');
   // newLi.innerText = `Name: ${pokemonData.nickname};  Species: ${pokemonData.species}`
   // button = document.createElement('button'),
   // button.id = pokemonData
   // teamList.append(newLi);
   init();
   // debugger
};
