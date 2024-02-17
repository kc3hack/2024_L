class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(name: user_params[:name])
    if user.save
      render json: { status: "success", data: { user: user } }, status: :created
    else
      render json: { status:"success", data: { error: user.errors } }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
