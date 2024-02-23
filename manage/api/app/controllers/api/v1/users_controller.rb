require "firebase_authenticator.rb"

class Api::V1::UsersController < Api::ApiController
  skip_before_action :authenticate_user, only: [:create, :update]
  rescue_from FirebaseAuthenticator::InvalidTokenError do |error|
    render json: { status: "error", data: { error: error, message: error.message } }, status: :unauthorized
  end

  def show
    render json: { status: "success", data: { user: current_user } }, status: :ok
  end

  def create
    token = request.headers["Authorization"]&.split("Bearer ")&.last
    raise FirebaseAuthenticator::InvalidTokenError.new("No token") unless token
    payload = FirebaseAuthenticator.new(token).validate!
    user = User.new(name: user_params[:name], uid: payload["user_id"])
    if user.save
      render json: { status: "success", data: { user: user } }, status: :created
    else
      render json: { status: "success", data: { error: user.errors } }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: { status: "success", data: { user: user } }, status: :ok
    else
      render json: { status: "success", data: { error: user.errors } }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :point)
  end
end
