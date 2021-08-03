class AddIndexToUserTable < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :username
    add_index :users, :f_name
    add_index :users, :l_name
  end
end
