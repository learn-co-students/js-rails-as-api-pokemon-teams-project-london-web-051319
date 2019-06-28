class PokemonsController < ApplicationController
  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy

    render json: pokemon, except: [:created_at, :updated_at]
  end
end
