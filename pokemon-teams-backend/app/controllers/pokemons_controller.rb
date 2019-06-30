class PokemonsController < ApplicationController

   def show
     pokemon = Pokemon.find(params[:id])
     render json: PokemonSerializer.new(pokemon)
   end

   def index
      pokemons = Pokemon.all
      render json: PokemonSerializer.new(pokemons)
   end

   def create
      trainer = Trainer.find_by(name: params[:trainer])
      pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: trainer.id)
      render json: PokemonSerializer.new(pokemon)
   end

   def update
      pokemon = Pokemon.find(params[:id])
      pokemon.update(pokemon_params)
      render json: PokemonSerializer.new(pokemon)
   end

   def destroy
      pokemon = Pokemon.find(params[:id])
      pokemon.destroy
      render text: "Pokemon successfully deleted!"
   end

   def pokemon_params
      params.require(:pokemon).permit(:nickname, :species, :trainer_id)
   end

end
