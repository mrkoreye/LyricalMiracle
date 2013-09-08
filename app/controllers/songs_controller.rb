class SongsController < ApplicationController
  def index
    @songs = Song.all
    
    @song = Song.last
    render :index
  end
  
  def show
    @song = Song.find(params[:id])
  end
  
  def new
    @song = Song.new
    render :new
  end
  
  def edit
    @song = Song.find(params[:id])
    render :edit
  end
  
  def create
    @song = Song.new(params[:song])
    @song.clean_lyrics_create
    @song.body.squish
    
    if @song.save
      redirect_to song_url(@song)
    end
  end
  
  def update
    @song = Song.find(params[:id])
    url_end = request.url.split("/").last
    
    if url_end == "edit"
      html_body = params[:body]
      
      @song.body = html_body
      save_song(@song)
      render :json => @song
    else
      new_song = Song.new(:body => params[:body])
      old_lyrics = @song.clean_lyrics_fully_no_space
      new_lyrics_stripped = new_song.clean_lyrics_fully_no_space

      if old_lyrics == new_lyrics_stripped
        @song.body = params[:body]
        save_song(@song)
        render :json => @song
      else
        render :json => "something went wrong"
      end
    end
  end
  
  
  def save_song(song)
    song.clean_lyrics_update
    song.body.squish
    song.save
  end
  
  # def markdown(text)
  #   markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML.new(
  #     :hard_wrap => true,
  #     :no_styles => true
  #   ))
  #   markdown.render(text)
  # end
  
end
