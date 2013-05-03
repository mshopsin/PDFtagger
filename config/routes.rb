BackendDeviseTest::Application.routes.draw do
  root :to => "documents#index"
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" } 
  
  resources :documents
  resources :tags
  resources :posts
  resources :users
  resources :user_data
end
