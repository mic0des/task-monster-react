Rails.application.routes.draw do
  devise_for :users
  resources :task_lists
  resources :tasks
  resources :monsters
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope :auth do
  	get 'is_signed_in', to: 'auth#is_signed_in?'
  end
end
