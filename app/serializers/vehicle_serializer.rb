




class VehicleSerializer < ActiveModel::Serializer

  attributes :id, :make, :plate_number, :user_id, :price, :vehicle_type, :speed, :image, :billing, :approved, :technician_id, :service, :repair, :summary
end
