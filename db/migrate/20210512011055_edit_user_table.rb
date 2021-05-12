class EditUserTable < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :f_name, :string
  end
end
