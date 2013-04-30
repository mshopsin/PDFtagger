class Post < ActiveRecord::Base
  attr_accessible :response, :author_id, :reply_to_id, :tag_id
  
  belongs_to :author, class_name: "User"
  belongs_to :reply_to, class_name: "Post"
  belongs_to :tag

end
