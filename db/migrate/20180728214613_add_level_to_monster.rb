class AddLevelToMonster < ActiveRecord::Migration[5.1]
  def change
    add_column :monsters, :level, :integer
  end
end
