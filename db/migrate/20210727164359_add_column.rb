class AddColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :pins, :heightof, :integer
  end
end
