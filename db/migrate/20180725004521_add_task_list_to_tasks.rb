class AddTaskListToTasks < ActiveRecord::Migration[5.1]
  def change
    add_reference :tasks, :task_list, foreign_key: true
  end
end
