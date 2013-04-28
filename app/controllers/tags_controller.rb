class TagsController < ApplicationController
  def index
    render :json => Tag.all
  end
  
  def create
    tag = Tag.new(params[:tag])
    tag.owner_id = current_user.id
    if tag.save!
      render :json => tag.to_json
    else
      render :json => tag.errors, status: 422
    end
  end
  
  def show
  end
  
  def destory
  end
end
