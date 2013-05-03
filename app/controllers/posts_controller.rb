class PostsController < ApplicationController
    before_filter :authenticate_user!
  def index
    render :json => Post.all
  end
  
  def create
    post = Post.new(params[:post])
    post.author_id = current_user.id
    if post.save!
      render :json => post.to_json
    else
      render :json => post.errors, status: 422
    end
  end
  
  def show
    post = Post.find(params[:id])
    render json: post.to_json
  end
  
  def destory
  end
end
