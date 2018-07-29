class AddMonsterToTaskLists < ActiveRecord::Migration[5.1]
  def change
    add_reference :task_lists, :monster, foreign_key: true
  end
end
