class Song < ActiveRecord::Base
  attr_accessible :album_title, :artist, :body, :title, :user_id, :youtube_link
  
  # validates :artist, :body, :title, :presence => true
  has_many :annotations
  
  def clean_lyrics_create
    unclean_lyrics = self.body
    clean_lyrics = Sanitize.clean(unclean_lyrics, 
      :elements => ['br'],
      :remove_contents => false
    )
    self.body = clean_lyrics
  end
  
  def clean_lyrics_update
    unclean_lyrics = self.body
    clean_lyrics = Sanitize.clean(unclean_lyrics, 
      :elements => ['a', 'br'],
      :attributes => {'a' => ['href', 'class']},
      :protocols => {'a' => {'href' => [:relative]}},
      :remove_contents => true
    )
    self.body = clean_lyrics
  end
  
  def clean_lyrics_fully_no_space
    unclean_lyrics = self.body
    clean_lyrics = Sanitize.clean(unclean_lyrics, 
      :elements => [],
      :remove_contents => false
    )
    clean_lyrics.gsub(/\s+/, "")
  end
end
