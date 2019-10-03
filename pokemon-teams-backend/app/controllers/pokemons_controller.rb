class PokemonsController < ApplicationController
  before_action :set_selection, only: [:show, :destroy]

  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons).to_serialized_json
  end

  def show
    render json: PokemonSerializer.new(@pokemon).to_serialized_json
  end

  def create
    pokemon = Pokemon.createPokemonForTeam(params[:pokemon][:trainer_id])
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def destroy
    Pokemon.destroy(@pokemon.id)
    render json: PokemonSerializer.new(@pokemon).to_serialized_json
  end

  private

  def set_selection
    @pokemon = Pokemon.find(params[:id])
  end
end
