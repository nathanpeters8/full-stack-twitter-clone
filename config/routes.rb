Rails.application.routes.draw do
  get '/' => redirect('/login')
  get 'login' => 'static_pages#landing_page'
  get 'signup' => 'static_pages#landing_page'
  get 'home' => 'static_pages#home'
  get 'home/*uri' => 'static_pages#home'

  namespace :api do
    # USERS
    post '/users'                  => 'users#create'
    get  '/users/:username'        => 'users#find_username'

    # SESSIONS
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    # TWEETS
    post '/tweets'                 => 'tweets#create'
    get  '/tweets'                 => 'tweets#index'
    delete '/tweets/:id'           => 'tweets#destroy'
    get  '/users/:username/tweets' => 'tweets#index_by_user'
    get  '/tweets/search/:keyword' => 'tweets#search'
  end

  # get '*path' => 'static_pages#home'
  # if you are using active storage to upload and store images, comment the above line
end
