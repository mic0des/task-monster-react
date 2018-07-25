class AddLastSavedToTaskLists < ActiveRecord::Migration[5.1]
  def change
    add_column :task_lists, :last_saved, :integer
  end
end
