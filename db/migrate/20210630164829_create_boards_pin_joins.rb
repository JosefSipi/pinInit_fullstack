class CreateBoardsPinJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :boards_pin_joins do |t|
      t.integer :pin_id, null: false
      t.integer :board_id, null: false
      t.text :note

      t.timestamps
    end

    add_index :boards_pin_joins, :pin_id
    add_index :boards_pin_joins, :board_id
  end
end
