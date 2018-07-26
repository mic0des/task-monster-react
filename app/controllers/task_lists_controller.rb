class TaskListsController < ApplicationController
	def update 
		@task_list = TaskList.find(params["id"]).update(last_saved: params["task"]["last_saved"])
	end
end
