LyricalMiracle::Application.routes.draw do
  devise_for :users
  resources :songs
  resources :annotation
  root :to => "songs#index"
end
