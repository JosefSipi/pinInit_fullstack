class AddColumPinTable < ActiveRecord::Migration[5.2]
  def change
    add_column :pins, :board_id, :integer
  end
end
