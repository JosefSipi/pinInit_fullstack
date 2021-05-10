class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :f_name, null: false
      t.string :l_name, null: false
      t.string :username, null: false
      t.text :bio
      t.integer :age, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      
      t.timestamps
    end
    add_index :users, :session_token
  end
end
