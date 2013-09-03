class Annotation < ActiveRecord::Base
  attr_accessible :body, :song_id, :user_id
end
