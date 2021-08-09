class AddColumnRemoveC < ActiveRecord::Migration[5.2]
  def change
    remove_column :follows,:followed_user

    add_column :follows, :followed_user_id, :integer, null: false
  end
end
