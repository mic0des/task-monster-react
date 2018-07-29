class TaskListsController < ApplicationController
	def update 
		TaskList.find(params["id"]).update(last_saved: params["task"]["last_saved"])
		@task_list = TaskList.find(params["id"])
		render :json => @task_list.to_json(:include => {:tasks => {:only => [:name, :done, :id]}})
	end

	def show 
		@task_list = TaskList.find(params["id"])
		render :json => @task_list.to_json(:include => {:tasks => {:only => [:name, :done, :id]}}) 

		# respond_to do |f|
		# 	f.json {render :json => @task_list.to_json(:include => {:tasks => {}})} 
		# end	
	end

	def create
		raise params
		@task_list = TaskList.create(name: params["taskList"]["name"], user_id: params["taskList"]["user_id"], last_saved: 0, monster_id: params["taskList"]["monster_id"], deadline: params["taskList"]["deadline"])
	end

	def index 
		@task_lists = TaskList.all 
		render :json => @task_lists.to_json(:only => [:name, :last_saved, :id])
	end
end