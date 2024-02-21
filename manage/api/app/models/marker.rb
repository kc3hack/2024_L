class Marker < ApplicationRecord
  has_many :user_marker_links
  has_many :users, through: :user_marker_links
end
