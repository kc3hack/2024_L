class CreateMarkerColors < ActiveRecord::Migration[7.0]
  def change
    create_table :marker_colors do |t|
      t.integer :point
      t.string :color

      t.timestamps
    end
  end
end
