class AnnotationsController < ApplicationController
  def create
    @annotation = Annotation.new
    @annotation.song_id = params[:id]
    #add line that assigns the user_id
    @annotation.save
    render :json => @annotation
  end
end
