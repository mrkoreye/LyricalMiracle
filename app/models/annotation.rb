class Annotation < ActiveRecord::Base
  attr_accessible :body, :song_id, :user_id
  validates :body, :user_id, :song_id, :presence => true
  
  belongs_to :user
  belongs_to :song
end
