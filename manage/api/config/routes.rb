Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create, :update] do
        resources :markers, only: [:index], to: "markers#index_by_user"
      end
      resources :markers, only: [:index, :show, :create, :update, :destroy]
      resources :grades, only: [:index]
      resources :marker_colors, only: [:index]
      resources :user_marker_links, only: [:create]
    end
  end
end
