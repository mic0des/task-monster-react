class AddDeadToMonster < ActiveRecord::Migration[5.1]
  def change
    add_column :monsters, :dead, :boolean, default: false
  end
end
