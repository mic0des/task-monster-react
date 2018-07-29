class AddDeadlineToTaskList < ActiveRecord::Migration[5.1]
  def change
    add_column :task_lists, :deadline, :datetime
  end
end
