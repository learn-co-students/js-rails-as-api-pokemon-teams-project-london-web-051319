class Trainer < ApplicationRecord
  has_many :pokemons

  def random_pokemon
    len = self.pokemons.count
    pokemon = Pokemon.all
    pokemon_len = pokemon.count - 1
    new_pokemon = nil

    if len < 6
      n = rand(0..pokemon_len)
      new_pokemon = pokemon[n]
      self.pokemons <<  new_pokemon
    else
      nil
    end

    new_pokemon
  end
end
