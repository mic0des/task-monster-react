class AddFinishedToTaskList < ActiveRecord::Migration[5.1]
  def change
    add_column :task_lists, :finished, :boolean, default: false
  end
end
