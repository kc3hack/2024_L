class AddConstraintsToMarkers < ActiveRecord::Migration[7.0]
  def change
    # nameカラムにNOT NULLとユニーク制約を追加
    change_column_null :markers, :name, false
    add_index :markers, :name, unique: true

    # latitudeカラムにNOT NULL制約を追加
    change_column_null :markers, :latitude, false

    # longitudeカラムにNOT NULL制約を追加
    change_column_null :markers, :longitude, false

    # latitudeとlongitudeの組み合わせでユニーク制約を追加
    add_index :markers, [:latitude, :longitude], unique: true
  end
end
