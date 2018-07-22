class UsersController < ApplicationController
	def create 

		@users = User.all
		respond_to do |f|
			f.json {render :json=> @users.to_json}
		end
	end
end
