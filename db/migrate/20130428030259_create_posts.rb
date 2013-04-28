class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :response
      t.references :author
      t.references :reply_to
      t.references :tag

      t.timestamps
    end
    add_index :posts, :author_id
    add_index :posts, :reply_to_id
    add_index :posts, :tag_id
  end
end
