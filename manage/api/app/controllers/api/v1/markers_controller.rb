class Api::V1::MarkersController < Api::ApiController
  skip_before_action :authenticate_user

  def index
    markers = Marker.all
    render json: { status: "success", data: { markers: markers } }, status: :ok
  end

  def show
    marker = Marker.find(params[:id])

    if marker.nil?
      render json: { status: "error", data: { error: "Marker not found" } }, status: :not_found
    else
      render json: { status: "success", data: { marker: marker } }, status: :ok
    end
  end

  def create
    marker = Marker.new(marker_params)
    if marker.save
      render json: { status: "success", data: { marker: marker } }, status: :created
    else
      render json: { status: "error", data: { error: marker.errors } }, status: :unprocessable_entity
    end
  end

  def update
    marker = Marker.find(params[:id])
    if marker.update(marker_params)
      render json: { status: "success", data: { marker: marker } }, status: :ok
    else
      render json: { status: "error", data: { error: marker.errors } }, status: :unprocessable_entity
    end
  end

  def destroy
    marker = Marker.find(params[:id])
    if marker.destroy
      render json: { status: "success", data: { marker: marker } }, status: :ok
    else
      render json: { status: "error", data: { error: marker.errors } }, status: :unprocessable_entity
    end
  end

  private

  def marker_params
    params.require(:marker).permit(:name, :description, :latitude, :longitude, :address)
  end
end
