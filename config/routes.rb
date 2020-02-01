Rails.application.routes.draw do

  root 'requests#index'

  get 'load', to: 'requests#load'

  post 'search', to: 'requests#search'

  resources :request

end
