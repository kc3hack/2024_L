class Api::V1::MarkerColorsController < Api::ApiController
  skip_before_action :authenticate_user

  def index
    marker_colors = MarkerColors.all
    render json: { status: "success", data: { marker_color: marker_colors } }
  end
end
