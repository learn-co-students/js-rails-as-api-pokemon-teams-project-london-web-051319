class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers).serialized_json
  end

  def show
    trainer = Trainer.find(params[:id])
    render json: TrainerSerializer.new(trainer).serialized_json
  end

  def create
    trainer = Trainer.find(params[:trainer_id])
    pokemon = trainer.random_pokemon
    if pokemon
      render json: pokemon, except: [:created_at, :updated_at]
    else
      render json: {error: 'more than 6 pokemon'}
    end
  end
end
