class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :omniauthable,
           :recoverable, :rememberable, :trackable, :validatable, :omniauth_providers => [:google_oauth2]
           
  attr_accessible :email, :password, :password_confirmation, :remember_me, :username, :provider, :uid
  
  def self.from_omniauth(auth)
    if user = User.find_by_email(auth.info.email)
      user.provider = auth.provider
      user.uid = auth.uid
      user
    else
      user = User.new
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.save
      user
    end
  end
end