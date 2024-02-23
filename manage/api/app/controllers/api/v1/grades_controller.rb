class Api::V1::GradesController < Api::ApiController
  skip_before_action :authenticate_user

  def index
    grades = Grade.all
    render json: { status: "success", data: { grades: grades } }, status: :ok
  end
end
