class RemoveTableColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :pins, :title, :string

    add_column :pins, :title, :string
  end
end
