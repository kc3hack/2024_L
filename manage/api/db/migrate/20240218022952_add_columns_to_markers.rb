class AddColumnsToMarkers < ActiveRecord::Migration[7.0]
  def change
    # addressカラムを追加
    add_column :markers, :address, :string, null: false, default: ''
  end
end
