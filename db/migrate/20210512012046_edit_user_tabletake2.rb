class EditUserTabletake2 < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :f_name
    add_column :users, :f_name, :string
  end
end
