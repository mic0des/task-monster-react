class MonstersController < ApplicationController
	def update
		@monster = Monster.find(params[:id])
		@monster.update(level: params[:monster][:level])

		render :json => @monster.to_json(:only => [:level]) 
	end
end
