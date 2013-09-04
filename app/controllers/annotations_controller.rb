class AnnotationsController < ApplicationController
  def create
    @annotation = Annotation.new
    @annotation.song_id = params[:id]
    #add line that assigns the user_id
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
