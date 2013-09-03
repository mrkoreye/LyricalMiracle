require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :email, :session_token, :username, :password

  attr_reader :password

  validates :username, :password_digest, :presence => true
  validates :password, :length => { :minimum => 3 }

  def password
    @password || self.password_digest
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def verify_password(password)
    BCrypt::Password.new(self.password_digest) == password
  end
end
