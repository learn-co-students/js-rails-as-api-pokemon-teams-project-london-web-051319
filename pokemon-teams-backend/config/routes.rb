Rails.application.routes.draw do
  resources :pokemons, only: [:show, :index, :create, :destroy]
  resources :trainers, only: [:show, :index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
