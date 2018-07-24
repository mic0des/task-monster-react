Rails.application.routes.draw do
  # devise_for :users
  resources :task_lists
  resources :tasks
  resources :monsters
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post 'auth_user' => 'authentication#authenticate_user'
  delete 'sign_out' => 'authentication#sign_out'
  get 'home' => 'home#index'
end
