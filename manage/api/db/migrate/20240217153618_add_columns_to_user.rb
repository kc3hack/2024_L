class AddColumnsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :uid, :string, null: false
    add_index :users, :uid, unique: true
  end
end
