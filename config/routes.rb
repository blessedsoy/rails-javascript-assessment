Rails.application.routes.draw do
  # resources :votes
  # resources :memos
  resources :lists
  resources :sample_sales
  root to: 'home#index'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks"}
  resources :lists, only: [:index] do
    resources :sample_sales, only: [:show]
  end
  
  post "/add_to_list" => 'lists#create'
  get "/like" => 'votes#like'
  get "/dislike" => 'votes#dislike'
  get "/sort_by_likes" => 'sample_sales#sort_by_likes'
  get "/sort_by_dates" => 'lists#sort_by_dates'
  post "/delete_memo/:id" => 'lists#delete_memo', as: 'delete_memo'
  get '/the_user' => 'votes#the_user'

end
