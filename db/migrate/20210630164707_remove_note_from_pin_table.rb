class RemoveNoteFromPinTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :pins, :note
  end
end
