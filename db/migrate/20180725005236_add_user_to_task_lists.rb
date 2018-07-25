class AddUserToTaskLists < ActiveRecord::Migration[5.1]
  def change
    add_reference :task_lists, :user, foreign_key: true
  end
end
