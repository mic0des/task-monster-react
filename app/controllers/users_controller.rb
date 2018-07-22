class UsersController < ApplicationController
	def create 
		# Parameters: {"user"=>{"email"=>"test@gmail.com", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]", "name"=>"test", "provider"=>"email"}}
		User.create(email: params["user"]["email"], password: params["user"]["password"], password_confirmation: params["user"]["password_confirmation"])
		@users = User.all
		respond_to do |f|
			f.json {render :json=> @users.to_json}
		end
	end
end
