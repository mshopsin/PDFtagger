class TagsController < ApplicationController
    before_filter :authenticate_user!
  def index
    render :json => Tag.all
  end
  
  def create
    tag = Tag.new(params[:tag])
    tag.creator_id = current_user.id
    if tag.save!
      render :json => tag.to_json
    else
      render :json => tag.errors, status: 422
    end
  end
  
  def update
    puts params
    tag = Tag.find(params[:id])
    if tag.update_attributes(params[:tag])
      render :json => {status: "ok!"}
    else
      render :json => tag.errors, status: 422
    end
  end
  
  def show
  end
  
  def destroy
    tag = Tag.find(params[:id])
    tag.destroy
    render json: {status: "ok"}
  end
end
