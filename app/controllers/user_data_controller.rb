class UserDataController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    render json: User.all
  end
  
end
