class CreateDocumentGroups < ActiveRecord::Migration
  def change
    create_table :document_groups do |t|

      t.references :document
      t.references :user

      t.timestamps
    end
    add_index :document_groups, :document_id
    add_index :document_groups, :user_id
  end
end
