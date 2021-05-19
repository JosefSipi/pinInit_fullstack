Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, default: {format: :json} do
    resources :users  do 
      resources :boards, only: [:index]
    end

    resource :session, only: [:new, :create, :destroy]
    resources :boards, onlu: [:new, :create, :destroy, :update, :edit ]
  end


  root "static_pages#root"


end
