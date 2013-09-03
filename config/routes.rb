LyricalMiracle::Application.routes.draw do
  devise_for :users
  resources :songs
  resources :annotations
  root :to => "songs#index"
end
