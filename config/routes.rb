BackendDeviseTest::Application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  root :to => "documents#index"
  
  resources :documents
  resources :tags
  resources :posts
  resources :users
end
