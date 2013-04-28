class Document < ActiveRecord::Base
  attr_accessible :location, :preview, :title
  
  belongs_to :owner, class_name: "User"
  has_many :tags, dependent: :destroy
  has_many :posts, through: :tags
  
  validates :title, presence: true
  validates :owner, presence: true
  
end
