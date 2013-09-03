class Song < ActiveRecord::Base
  attr_accessible :album_title, :artist, :body, :title, :user_id, :youtube_link
end
