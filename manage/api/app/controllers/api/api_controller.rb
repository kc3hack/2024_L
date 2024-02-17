require "firebase_authenticator.rb"

class Api::ApiController < ApplicationController
  before action :authenticate_user

  class AuthenticationError < StandardError; end

  rescue_from AuthenticationError do |e|
    render json: { status: "error", data: { message: e.message } }, status: :unauthorized
  end

  def authenticate_user
    raise AuthenticationError.new("Unauthorized") unless current_user
  end

  def current_user
    @current_user ||= FirebaseAuthenticator.new(request.headers["Authorization"]).authenticate
  end

  
end
