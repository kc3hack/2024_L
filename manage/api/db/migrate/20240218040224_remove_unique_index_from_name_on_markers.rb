class RemoveUniqueIndexFromNameOnMarkers < ActiveRecord::Migration[7.0]
  def up
    remove_index :markers, name: "index_markers_on_name"
  end

  def down
    add_index :markers, :name, unique: true, name: "index_markers_on_name"
  end
end
