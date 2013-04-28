class PostsController < ApplicationController
  def index
    render :json => Post.all
  end
  
  def create
    post = Post.new(params[:post])
    post.owner_id = current_user.id
    if post.save!
      render :json => post.to_json
    else
      render :json => post.errors, status: 422
    end
  end
  
  def show
  end
  
  def destory
  end
end
