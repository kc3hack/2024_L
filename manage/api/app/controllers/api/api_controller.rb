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
    raise AuthenticationError.new("Not Loginded") unless current_user(payload["user_id"])
  end

  def current_user(user_id)
    @current_user ||= User.find_by(uid: user_id)
  end
end
