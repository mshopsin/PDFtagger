class Document < ActiveRecord::Base
  attr_accessible :location, :preview, :title, :pdf, :pdf_data, :owner_id
  
  belongs_to :owner, class_name: "User"
  has_many :tags, dependent: :destroy
  has_many :posts, through: :tags
  has_many :document_groups, dependent: :destroy
  #has_attached_file :pdf
  
  validates :title, presence: true
  validates :title, uniqueness: true
  #validates :owner, presence: true
  
  
end
