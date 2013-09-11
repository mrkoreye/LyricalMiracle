class RegistrationsController < Devise::RegistrationsController
  
  def create
    build_resource
    
    if resource.save
      sign_in(:user, resource)
      render :json => {:success => true}
    else
      render :json => {:success => false, :errors => resource.errors.full_messages}, :status => 422
    end
  end
end