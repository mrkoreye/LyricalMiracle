class Annotation < ActiveRecord::Base
  attr_accessible :body, :song_id, :user_id
  
  belongs_to :user
  belongs_to :song
end
