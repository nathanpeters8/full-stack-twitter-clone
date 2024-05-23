module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create'
      else
        render json: {
          success: false
        }
      end
    end

    def find_username
      username = params[:username]
      @user = User.find_by(username: username)

      if @user
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
  end
end
