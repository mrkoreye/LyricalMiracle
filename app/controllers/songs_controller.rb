class SongsController < ApplicationController
  def index
    if params[:song] && params[:song][:search_query]
      @is_search = true
      @query = params[:song][:search_query]
      search = "%" + params[:song][:search_query] + "%"
      @songs = Song.where(<<-SQL, search, search)
        UPPER(title) LIKE UPPER(?) OR UPPER(artist) LIKE UPPER(?)
        SQL
      render :index
    else  
      @songs = Song.all
      @song = Song.last
      @song_titles = Song.pluck(:title)
    
      respond_to do |format|
        format.html {render :index}
        format.json { render :json => @song_titles.to_json }
      end
    end
  end
  
  def artists
    @artists = Song.pluck(:artist).uniq
    
    respond_to do |format|
      format.json { render :json => @artists.to_json }
    end
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
    else
      flash[:errors] = []
      flash.now[:errors] << @song.errors.full_messages.to_sentence
      render :new
    end
  end
  
  def update
    #originally had way to stop editing in DOM from song display page
    #from getting saved, but removed because I thought it was overkill
    #considering anyone is allowed to edit a song anyway
    @song = Song.find(params[:id])
    @song.body = params[:song][:body]
    @song.title = params[:song][:title]
    @song.artist = params[:song][:artist]
    clean_song(@song)

    if @song.save
      respond_to do |format|
        format.json { render :json => @song }
        format.html { redirect_to song_url(@song) }
      end
    else
      respond_to do |format|
        format.json { render :json => { :errors => @song.errors.full_messages } }
        format.html do
          flash[:errors] = []
          flash.now[:errors] << @song.errors.full_messages.to_sentence
          render :edit
        end
      end
    end
  end
  
  
  def clean_song(song)
    song.clean_lyrics_update
    song.body.squish
  end
  
end
