class RegistrationsController < Devise::RegistrationsController
  include ApplicationsHelper

  def create
    build_resource(params[:user])
    
    if resource.save
      sign_in(:user, resource)
      render :json => {:resource => resource}
    else
      render :json => {:errors => resource.errors.full_messages.to_sentence}, :status => 422
    end
  end
end