class DocumentGroup < ActiveRecord::Base
  attr_accessible :document_id, :user_id
  belongs_to :document
  belongs_to :user , class_name: "User"
  
  #validates :user_id, uniquness: {scope: :document_id}
  
end
