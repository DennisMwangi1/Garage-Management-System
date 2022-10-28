
class VehiclesController < ApplicationController
    def index
      vehicles = Vehicle.all
      render json: vehicles
    end

    def create
        vehicle = Vehicle.create!(vehicle_params)
        #session[:vehicle_id] = vehicle.id
        render json: vehicle, status: :created
    end

    def destroy
        vehicle = Vehicle.find_by(id: params[:id])
        if vehicle
          vehicle.destroy
          head :no_content
        else
          render json: { error: "Vehicle not found" }, status: :not_found
        end
    end

    def update
        vehicle = Vehicle.find_by(id: params[:id])
        if vehicle
          vehicle.update(vehicle_params)
          render json: vehicle
        else
          render json: { error: "Vehicle not found" }, status: :not_found
        end
    end

    private

    def vehicle_params
        params.permit(:make, :plate_number, :user_id, :id, :price, :vehicle_type, :speed, :image, :billing, :approved, :technician_id)
    end
end
