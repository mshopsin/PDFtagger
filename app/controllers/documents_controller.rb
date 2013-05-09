class DocumentsController < ApplicationController
  before_filter :authenticate_user!
  respond_to :json
  
  def index
  
    @documents = Document.find(DocumentGroup.find_all_by_user_id(current_user.id).map { |doc| doc.document_id })
    
    respond_to do |format|
      
      format.html { render :index }
      format.json { render :json => @documents.as_json(only: [:tags, :id, :title, :owner_id] ) }
    end
  end
  
  def create
    @document = Document.new( params[:document] )
    @document.owner_id = current_user.id  
    if @document.save
      DocumentGroup.create({document_id: @document.id, user_id: @document.owner_id })
      render json: @document.as_json(only: [:title, :id])
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
    DocumentGroup.delete_all(["(document_id = ?)",document.id])
    document.destroy
    render json: {status: "ok"}
  end
 
  
end
