class AddTypeToMonster < ActiveRecord::Migration[5.1]
  def change
    add_column :monsters, :type, :string
  end
end
