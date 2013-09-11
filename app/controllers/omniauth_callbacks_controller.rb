class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user
      sign_in(@user)
      #this only has to happen on sign up for some reason
      warden.set_user @user
      redirect_to request.env['omniauth.origin']
    else
      render :json => {:success => false, :errors => "Login Failed. Please try again."}, :status => 422
    end
  end
end