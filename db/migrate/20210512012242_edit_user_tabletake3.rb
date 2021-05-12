class EditUserTabletake3 < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :l_name
    add_column :users, :l_name, :string

    remove_column :users, :username
    add_column :users, :username, :string
  end
end
