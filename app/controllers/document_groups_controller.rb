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
    
     render :json => "we good!", :status => :ok
   
  end
  
  #adds new user and creates control group
  def new
    puts params
    new_email = params[:document_group][:email]
    doc_id    = params[:document_group][:document_id]
    puts new_email
    puts doc_id
    render json: { status: "ok" }
    User.invite!({:email => new_email}, current_user )
    new_user = User.find_by_email(new_email)
    DocumentGroup.create!({document_id: doc_id, user_id: new_user.id })
    render json: { status: "ok" }
 #       puts "sent!"
 #     end
     
  end
  
  def destroy
    document_group = DocumentGroup.find(params[:id])
    document_group.destroy
    render json: { status: "ok" }
  end
  
end
