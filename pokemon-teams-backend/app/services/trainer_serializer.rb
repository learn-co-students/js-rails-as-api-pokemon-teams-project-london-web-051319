class TrainerSerializer
 
  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    @trainer.to_json(:include => {
      :pokemon => {:only => [:id, :species, :nickname]}
    }, :only => [:id, :name])
  end
   
end