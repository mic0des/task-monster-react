class TaskListsController < ApplicationController
	def update 
		@task_list = TaskList.find(params["id"]).update(last_saved: params["task"]["last_saved"])
	end

	def show 
		@task_list = TaskList.find(params["id"])
		@tasks = Task.where(task_list_id: params["id"])
		render :json => @task_list.to_json(:include => {:tasks => {:only => [:name, :done, :id]}}) 

		# respond_to do |f|
		# 	f.json {render :json => @task_list.to_json(:include => {:tasks => {}})} 
		# end	
	end
end
