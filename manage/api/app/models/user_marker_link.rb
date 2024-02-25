class UserMarkerLink < ApplicationRecord
  belongs_to :user
  belongs_to :marker
end
