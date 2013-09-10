LyricalMiracle::Application.routes.draw do
  mount Rich::Engine => '/rich', :as => 'rich'
  devise_for :users, :controllers => {:sessions => 'sessions'}

  root :to => "index#index"
  devise_for :users
  resources :songs
  resources :annotations
 
end
