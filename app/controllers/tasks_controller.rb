class TasksController < ApplicationController
	def create 
		@new_task = Task.create(name: params["name"], done: params["done"], task_list_id: params["task_list_id"])
		render json: @new_task
	end

	def update 
		@task = Task.find(params["id"])
		@task.update(done: @task.done == true ? false : true)
	end

	def destroy 
		@task = Task.find(params["id"]).delete
	end
end
