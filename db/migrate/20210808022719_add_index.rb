class AddIndex < ActiveRecord::Migration[5.2]
  def change
    add_index :follows, :followed_user
  end
end
