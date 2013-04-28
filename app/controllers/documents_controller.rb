class DocumentsController < ApplicationController
  before_filter :authenticate_user!
  respond_to :json
  
  def index
    respond_to do |format|
      
      format.html { render :index }
    end
  end
  
  def create
    p params[:document]
    @document = Document.create!( params[:document] )
    respond_to do |format|
      format.json { render json: @document }
    end
  end
  
  def destroy
  end
  
end
