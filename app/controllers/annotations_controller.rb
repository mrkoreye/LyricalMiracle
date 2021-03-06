class AnnotationsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    @annotation = Annotation.new(params[:annotation])
    @annotation.user_id = current_user.id
    @annotation.save
    render :json => @annotation
  end
  
  def update
    @annotation = Annotation.find(params[:id])
    @annotation.update_attributes(params[:annotation])
    render :json => @annotation
  end
  
  def destroy
    @annotation = Annotation.find(params[:id])
    @annotation.destroy
    render :json => @annotation
  end
end
