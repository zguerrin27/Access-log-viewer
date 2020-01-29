Rails.application.routes.draw do

  root 'requests#index'

  post 'search', to: 'requests#search'

  resources :request

end
