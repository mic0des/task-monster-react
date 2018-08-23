class UsersController < ApplicationController
	def create 
		# Parameters: {"user"=>{"email"=>"test@gmail.com", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]", "name"=>"test", "provider"=>"email"}}
		@new_user = User.create(email: params["email"], password: params["password"], password_confirmation: params["password_confirmation"], username: params["name"])
		if @new_user.errors.size > 0
			render json: @new_user.errors
		else 
			@new_user
			render json: payload(@new_user)
		end			
		# respond_to do |f|
		# 	f.json { render json: payload(@user) }
		# end
	end

	def show 
		@user = User.find(params["id"])
		render json: @user.to_json(:methods => [:gravatar_url_small])
	end

  def payload(user)
    return nil unless user and user.id
    {
      auth_token: JsonWebToken.encode({user_id: user.id}),
      user: {id: user.id, email: user.email}
    }
  end
end
