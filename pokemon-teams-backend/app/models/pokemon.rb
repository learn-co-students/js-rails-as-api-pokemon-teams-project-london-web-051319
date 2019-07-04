class Pokemon < ApplicationRecord
  belongs_to :trainer

   def self.createPokemon(trainer)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    if trainer.pokemons.length < 6
      Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    else
      nil
    end
  end
end
