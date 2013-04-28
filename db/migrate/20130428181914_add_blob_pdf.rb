class AddBlobPdf < ActiveRecord::Migration
  def change
    add_column :documents, :pdf_data, :binary
  end
end
