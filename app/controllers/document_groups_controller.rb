class DocumentGroupsController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    render json: DocumentGroup.all
  end
  
  def create
    
    doc_id = params[:document_group][:document_id].keys.first
    
    #access control
    if Document.find(doc_id).owner_id != current_user.id
      return
    end
    
    DocumentGroup.delete_all(["(document_id = ?)",doc_id])
    params[:document_group][:document_id][doc_id.to_sym][:user_id].keys.each do |user|
    
      document_group = DocumentGroup.create({document_id: doc_id, user_id: user })
    end
    
     render json: { status: "ok" }
   
  end
  
  def new
    puts params
    new_email = params[:email]
    doc_id    = params[:document_id]
    puts new_email
    puts doc_id
    render json: { status: "ok" }
     User.invite!({email: new_email}, current_user ) do |u|
       DocumentGroup.create!({document_id: doc_id, user_id: u.id })
       render json: { status: "ok" }
       puts "sent!"
     end
  end
  
  def destroy
    document_group = DocumentGroup.find(params[:id])
    document_group.destroy
    render json: { status: "ok" }
  end
  
end
