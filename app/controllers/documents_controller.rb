class DocumentsController < ApplicationController
  before_filter :authenticate_user!
  respond_to :json
  
  def index
    @documents = Document.all
    respond_to do |format|
      
      format.html { render :index }
      format.json { render :json => @documents.to_json(:include => [:tags]) }
    end
  end
  
  def create
    p params[:document]
    @document = Document.new( params[:document] )
    @document.owner_id = current_user.id  
    if @document.save
      format.json { render json: @document }
    end
  end
  
  def show
    @document = Document.find_by_title( params[:title] )
    respond_to do |format|
      format.json { render json: @document }
    end
  end
  
  def destroy
  end
  
end
