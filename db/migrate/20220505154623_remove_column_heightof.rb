class RemoveColumnHeightof < ActiveRecord::Migration[5.2]
  def change
    remove_column :pins, :heightof
  end
end
