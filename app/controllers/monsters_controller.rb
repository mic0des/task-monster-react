class MonstersController < ApplicationController
	def update
		@monster = Monster.find(params[:id])
		@monster.update(level: params[:level])

		render :json => @monster.to_json(:only => [:level]) 
	end

	def create 
		@monster = Monster.create(gender: params["gender"], level: 1, user_id: params["user_id"], nickname: params["nickname"], dead: false)

		render :json => @monster.to_json
	end
end
