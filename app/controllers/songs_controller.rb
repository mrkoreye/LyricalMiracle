class SongsController < ApplicationController
  def index
    @songs = Song.all
    render :index
  end
  
  def show
    @song = Song.find(params[:id])
    html_lyrics = @song.body
    @song_lyrics = Sanitize.clean(html_lyrics, 
      :elements => ['a', 'br'],
      :attributes => {'a' => ['href', 'class']},
      :protocols => {'a' => {'href' => ['http', 'https']}},
      :remove_contents => true
    )
  end
  
  def new
    render :new
  end
  
  def create
    @song = Song.new(params[:song])
    @song.body = @song.body.gsub("\r\n", "<br>")
    
    if @song.save
      redirect_to song_url(@song)
    end
  end
 
end
