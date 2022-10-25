






class TechniciansController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]
  
    def create
      technician = Technician.create!(technician_params)
      session[:technician_id] = technician.id
      render json: technician, status: :created
    end

    def index
        technicians = Technician.all
        render json: technicians
    end

    def show
      render json: @current_technician
    end
  
    private
  
    def technician_params
      params.permit(:name, :email, :telephone, :rating, :description, :id)
    end
end
