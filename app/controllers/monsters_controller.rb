class MonstersController < ApplicationController
	def update
		@monster = Monster.find(params[:id])
		@monster.update(level: params[:monster][:level])

		render :json => @monster.to_json(:only => [:level]) 
	end

	def create 
		@monster = Monster.create(gender: params["monster"]["gender"], level: 1, user_id: params["monster"]["user_id"], nickname: params["monster"]["nickname"], dead: false)

		render :json => @monster.to_json
	end
end
