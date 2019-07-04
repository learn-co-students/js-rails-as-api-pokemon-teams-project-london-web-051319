class PokemonsController < ApplicationController
  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon, only: [:id, :species, :nickname, :trainer_id]
end

 def index
    pokemons = Pokemon.all
    render json: pokemons, only: [:id, :species, :nickname, :trainer_id]
end

 def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
end

 def create
    trainer = Trainer.find_by(id: params[:trainer])
    pokemon = Pokemon.createPokemon(trainer)
    if pokemon
        render json: pokemon, only: [:id, :species, :nickname, :trainer_id]
    else
        render :json => { :error => 'oh no' }
    end
end

end
