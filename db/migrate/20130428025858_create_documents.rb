class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.string :title
      t.text :preview
      t.string :location
      t.references :owner

      t.timestamps
    end
    add_index :documents, :owner_id
  end
end
