require "firebase_authenticator.rb"

class Api::ApiController < ApplicationController
  before_action :authenticate_user

  class AuthenticationError < StandardError; end

  rescue_from AuthenticationError do |error|
    render json: { status: "error", data: { error: error, message: error.message } }, status: :unauthorized
  end

  def authenticate_user
    token = request.headers["Authorization"]&.split(" ")&.last
    payload = FirebaseAuthenticator.new(token).validate!
    @current_user_id = payload["user_id"]
    raise AuthenticationError.new("Not Logged In") unless current_user
  end

  def current_user
    @current_user ||= User.find_by(uid: @current_user_id) if @current_user_id
  end
end
