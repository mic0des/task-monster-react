class AuthenticationController < ApplicationController
  def authenticate_user
    user = User.find_by(email: params["email"])
    if !user 
      render json: {errors: ['Incorrect password and/or username']}
    elsif user.valid_password?(params["password"])
      render json: payload(user)
    else
      render json: {errors: ['Invalid Username/Password']}
    end
  end

  private

  def payload(user)
    return nil unless user and user.id
    {
      auth_token: JsonWebToken.encode({user_id: user.id}),
      user: {id: user.id, email: user.email, gravatar: user.gravatar_url_small}
    }
  end
end
