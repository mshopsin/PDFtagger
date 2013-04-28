class Document < ActiveRecord::Base
  attr_accessible :location, :preview, :title, :pdf, :pdf_data
  
  belongs_to :owner, class_name: "User"
  has_many :tags, dependent: :destroy
  has_many :posts, through: :tags
  has_attached_file :pdf
  
  validates :title, presence: true
  validates :title, uniqueness: true
  #validates :owner, presence: true
  
  
end
