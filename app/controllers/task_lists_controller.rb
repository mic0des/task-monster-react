class TaskListsController < ApplicationController
	def update 
		TaskList.find(params["id"]).update(last_saved: params["task"]["last_saved"], finished: params["task"]["finished"])
		@task_list = TaskList.find(params["id"])
		render :json => @task_list.to_json(:include => {:tasks => {:only => [:name, :done, :id]}}, :include => {:monster => {:only => [:level]}})
	end

	def show 
		@task_list = TaskList.find(params["id"])
		render :json => @task_list.to_json(:include => {:tasks => {:only => [:name, :done, :id]}}) 

		# respond_to do |f|
		# 	f.json {render :json => @task_list.to_json(:include => {:tasks => {}})} 
		# end	
	end

	def destroy
		@task_list = TaskList.find(params["id"])
		@task_list.delete
	end

	def create
		@task_list = TaskList.create(name: params["taskList"]["name"], user_id: params["taskList"]["user_id"], last_saved: 0, monster_id: params["taskList"]["monster"], deadline: params["taskList"]["deadline"])
	end

	def index 
		if !!params["user_id"]
			@task_lists = TaskList.where(user_id: params["user_id"])
		else
			@task_lists = TaskList.all 
		end
		render :json => @task_lists.to_json(:include => {:monster => {:only => [:nickname, :gender, :level, :id]}})
	end
end