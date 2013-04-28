class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.text :task
      t.integer :x_1
      t.integer  :x_2
      t.integer  :y_1
      t.integer  :y_2
      
      t.references :document
      t.references :creator

      t.timestamps
    end
    add_index :tags, :document_id
    add_index :tags, :creator_id
  end
end
