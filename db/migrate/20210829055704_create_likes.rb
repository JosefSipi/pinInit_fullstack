class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.integer :liker_id, null: false
      t.integer :comment_liked_id, null: false

      t.timestamps
    end
    add_index :likes, :liker_id
    add_index :likes, :comment_liked_id
  end
end
