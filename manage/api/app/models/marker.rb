class Marker < ApplicationRecord
  has_many :user_marker_links, dependent: :destroy
  has_many :users, through: :user_marker_links, dependent: :destroy
end
