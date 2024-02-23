class User < ApplicationRecord
  has_many :user_marker_links, dependent: :destroy
  has_many :markers, through: :user_marker_links, dependent: :destroy
end
