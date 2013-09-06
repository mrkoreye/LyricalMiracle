LyricalMiracle::Application.routes.draw do
  mount Rich::Engine => '/rich', :as => 'rich'

  devise_for :users
  resources :songs
  resources :annotations
  root :to => "songs#index"
end
