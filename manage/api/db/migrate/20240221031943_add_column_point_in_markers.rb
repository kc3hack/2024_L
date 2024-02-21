class AddColumnPointInMarkers < ActiveRecord::Migration[7.0]
  def up
    add_column :markers, :point, :integer
  end

  def down
    remove_column :markers, :point, :integer
  end
end
