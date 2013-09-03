object @song
attributes :album_title, :artist, :body, :title, :user_id, :youtube_link, :id

child :annotations => :annotations do
  attribute :id, :user_id, :song_id, :body
end