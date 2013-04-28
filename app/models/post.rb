class Post < ActiveRecord::Base
  attr_accessible :response
  
  belongs_to :author, class_name: "User"
  belongs_to :reply_to, class_name: "Post"
  belongs_to :tag

end
