Rails.application.routes.draw do

  root 'requests#index'

  get 'load', to: 'requests#load'

  get 'search', to: 'requests#search'

  resources :request

end
