class RemoveTableColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :pins, :title

    add_column :pins, :title, :string
  end
end
