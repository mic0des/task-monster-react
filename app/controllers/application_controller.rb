class ApplicationController < ActionController::API
 # 	before_action :configure_permitted_parameters, if: :devise_controller?

 # 	def configure_permitted_parameters
 #  		devise_parameter_sanitizer.for(:sign_up) << :name
 #  		devise_parameter_sanitizer.for(:sign_up) << :provider
 #  		devise_parameter_sanitizer.for(:sign_up) << :uid
	# end

  attr_reader :current_user

  protected
  def authenticate_request!
    unless user_id_in_token?
      render json: { errors: ['Not Authenticated'] }, status: :unauthorized
      return
    end
    @current_user = User.find(auth_token[:user_id])
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end

  private
  def http_token
      @http_token ||= if request.headers['Authorization'].present?
        request.headers['Authorization'].split(' ').last
      end
  end

  def auth_token
    @auth_token ||= JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token && auth_token && auth_token[:user_id].to_i
  end

end
