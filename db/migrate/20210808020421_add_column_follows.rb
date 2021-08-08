class AddColumnFollows < ActiveRecord::Migration[5.2]
  def change
    add_column :follows, :followed_user, :integer

    remove_column :follows, :followable_id
    remove_column :follows, :followable_type

  end

end
