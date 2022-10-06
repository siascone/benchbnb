class Api::SessionsController < ApplicationController
  def show
    @user = current_user
    if @user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    credential = params[:credential]
    password = params[:password]

    @user = User.find_by_credentials(credential, password)
     
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Invalid credentials.'] }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      logout!
      render json: { message: 'Successfully logged out' }, status: 200
      # head :no_content
    else
      render json: { message: 'No one to logout'}, status: 200
    end
  end

end
