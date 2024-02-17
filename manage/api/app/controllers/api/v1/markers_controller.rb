class Api::V1::MarkersController < Api::ApiController
  skip_before_action :authenticate_user, only: [:create]

  def create
    marker = Marker.new(marker_params)
    if marker.save
      render json: { status: "success", data: { marker: marker } }, status: :created
    else
      render json: { status: "error", data: { error: marker.errors } }, status: :unprocessable_entity
    end
  end

  private

  def marker_params
    params.require(:marker).permit(:name, :description, :latitude, :longitude)
  end
end
