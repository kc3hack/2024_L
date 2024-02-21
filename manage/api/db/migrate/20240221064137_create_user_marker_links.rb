class CreateUserMarkerLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :user_marker_links do |t|
      t.references :user, null: false, foreign_key: true
      t.references :marker, null: false, foreign_key: true

      t.timestamps
    end
  end
end
