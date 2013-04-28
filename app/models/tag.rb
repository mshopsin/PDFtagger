class Tag < ActiveRecord::Base
  
  attr_accessible :task, :x_1, :x_2, :y_1, :y_2, :creator_id, :document_id
  
  belongs_to :document
  belongs_to :creator, class_name: "User"
  has_many :posts, dependent: :destroy
  
end
