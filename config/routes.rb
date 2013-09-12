LyricalMiracle::Application.routes.draw do
  mount Rich::Engine => '/rich', :as => 'rich'
  
  devise_for :users, :controllers => {
    :sessions => 'sessions', 
    :registrations => 'registrations',
    :omniauth_callbacks => 'omniauth_callbacks'
  }

  root :to => "index#index"
  # devise_for :users
  get "songs/artists", :to => "songs#artists"
  resources :songs
  resources :annotations
  
end
