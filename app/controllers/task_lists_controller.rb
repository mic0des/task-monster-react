class TaskListsController < ApplicationController
	def update 
		TaskList.find(params["id"]).update(last_saved: params["last_saved"], finished: params["finished"])
		@task_list = TaskList.find(params["id"])
		render :json => @task_list.to_json(:include => {:tasks => {:only => [:name, :done, :id]}}, :include => {:monster => {:only => [:nickname, :gender, :level, :id]}, :tasks => {:only => [:name, :done, :id, :task_list_id]}})
	end

	def show 
		@task_list = TaskList.find(params["id"])
		render :json => @task_list.to_json(:include => {:tasks => {:only => [:name, :done, :id]}}) 
	end

	def destroy
		@task_list = TaskList.find(params["id"])
		@task_list.tasks.each {|task| task.delete}
		@task_list.delete
	end

	def create
		@task_list = TaskList.create(name: params["name"], user_id: params["user_id"], last_saved: 0, monster_id: params["monster"], deadline: params["deadline"])
		render :json => @task_list.to_json(:include => {:tasks => {:only => [:name, :done, :id]}}, :include => {:monster => {:only => [:nickname, :gender, :level, :id]}, :tasks => {:only => [:name, :done, :id, :task_list_id]}})
	end

	def index 
		if !!params["user_id"]
			@task_lists = TaskList.where(user_id: params["user_id"])
		else
			@task_lists = TaskList.all 
		end
		render :json => @task_lists.to_json(:include => {:monster => {:only => [:nickname, :gender, :level, :id]}, :tasks => {:only => [:name, :done, :id, :task_list_id]}})
	end

end