Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, default: {format: :json} do
    resources :users  do 
      resources :boards, only: [:index]
      # resources :pins, only: [:]
    end

    resource :session, only: [:new, :create, :destroy]
    resources :boards, only: [:new, :create, :destroy, :update, :edit ]
    resources :pins, only: [:new, :create, :destroy, :edit, :index, :show, :update]
    resources :boards_pin_joins, only: [:new, :create, :edit, :destroy, :update, :show, :index]
  end


  root "static_pages#root"


end
