class CreatePins < ActiveRecord::Migration[5.2]
  def change
    create_table :pins do |t|
      t.integer :creator_id, null: false
      t.string :title, null: false
      t.string :description
      t.string :description2
      t.string :websiteURL
      t.string :note

      t.timestamps
    end
    add_index :pins, :creator_id
  end
end
