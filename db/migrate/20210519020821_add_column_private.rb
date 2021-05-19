class AddColumnPrivate < ActiveRecord::Migration[5.2]
  def change
    add_column(:boards, :is_private, :boolean, :default => false)
  end
end
