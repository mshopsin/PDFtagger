class DocumentsController < ApplicationController
  before_filter :authenticate_user!
  respond_to :json
  
  def index
    @documents = Document.all
    respond_to do |format|
      
      format.html { render :index }
      format.json { render :json => @documents.to_json(:include => [:tags], only: [:title, :id] ) }
    end
  end
  
  def create
    @document = Document.new( params[:document] )
    @document.owner_id = current_user.id  
    if @document.save
      render json: @document.to_json(include: [:title, :id])
    else
      render json: @document.errors, status: 422
    end
  end
  
  def show
    document = Document.find( params[:id] )
    # respond_to do |format|
#       format.json { render json: @document }
#     end
    send_data document.pdf_data
  end
  
  def destroy
    document = Document.find(params[:id])
    document.destroy
    render json: {status: "ok"}
  end
 
  
end
