class UsersController < ApplicationController
	def create 
		# Parameters: {"user"=>{"email"=>"test@gmail.com", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]", "name"=>"test", "provider"=>"email"}}
		@new_user = User.create(email: params["user"]["email"], password: params["user"]["password"], password_confirmation: params["user"]["password_confirmation"], username: params["user"]["name"])
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

  def payload(user)
    return nil unless user and user.id
    {
      auth_token: JsonWebToken.encode({user_id: user.id}),
      user: {id: user.id, email: user.email}
    }
  end
end
