class AddNameToTaskLists < ActiveRecord::Migration[5.1]
  def change
    add_column :task_lists, :name, :string
  end
end
