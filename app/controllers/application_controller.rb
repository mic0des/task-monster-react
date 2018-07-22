class ApplicationController < ActionController::API
  include ActionController::MimeResponds
 # 	before_action :configure_permitted_parameters, if: :devise_controller?

 # 	def configure_permitted_parameters
 #  		devise_parameter_sanitizer.for(:sign_up) << :name
 #  		devise_parameter_sanitizer.for(:sign_up) << :provider
 #  		devise_parameter_sanitizer.for(:sign_up) << :uid
	# end

after_action :cors_set_access_control_headers

def cors_set_access_control_headers
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'POST, PUT, PATCH, DELETE, GET, OPTIONS'
  response.headers['Access-Control-Request-Method'] = '*'
  response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Email, Auth-Token, Accept, Authorization'
end


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
