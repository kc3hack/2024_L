class Api::V1::UserMarkerLinksController < Api::ApiController
  skip_before_action :authenticate_user

  rescue_from ActiveRecord::RecordNotFound do |error|
    render json: { status: "error", data: { error: error } }, status: :not_found
  end

  rescue_from ActiveRecord::RecordInvalid do |error|
    render json: { status: "error", data: { error: error } }, status: :unprocessable_entity
  end

  rescue_from ActionController::ParameterMissing do |error|
    render json: { status: "error", data: { error: error } }, status: :unprocessable_entity
  end

  def create
    user_marker_link = UserMarkerLink.new(user_marker_link_params)
    if user_marker_link.save
      render json: { status: "success", data: { user_marker_link: user_marker_link } }, status: :created
    else
      render json: { status: "error", data: { errors: user_marker_link.errors } }, status: :unprocessable_entity
    end
  end

  private

  def user_marker_link_params
    params.require(:user_marker_link).permit(:user_id, :marker_id)
  end
end
