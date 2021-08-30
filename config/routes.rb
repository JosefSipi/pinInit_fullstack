Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, default: {format: :json} do
    resources :users  do 
      resources :boards, only: [:index]
      resources :follows, only: [:index]
      resources :pins, only: [:index]

      # resources :pins, only: [:]
    end

    resources :boards do
      resources :pins, only: [:index]
    end

    resources :pins do 
      resources :comments, only: [:destroy, :new, :update, :show, :edit, :index]
    end

    resource :session, only: [:new, :create, :destroy]
    resources :boards, only: [:new, :create, :destroy, :update, :edit, :show ]
    resources :pins, only: [:new, :create, :destroy, :edit, :show, :update]
    resources :boards_pin_joins, only: [:new, :create, :edit, :destroy, :update, :show, :index]
    resources :follows, only: [:create, :destroy, :show, :new]
    resources :comments, only: [:create]
    resources :likes, only: [:create, :destroy, :index, :new, :show]
  end


  root "static_pages#root"


end
