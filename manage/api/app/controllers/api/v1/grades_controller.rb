class Api::V1::GradesController < ApplicationController
  skip_before_action :authenticate_user

  def index
    grades = Grades.all
    render json: { status: "success", data: { grades: grades } }, status: :ok
  end
end
